import celery, requests, datetime, re, time, json, hashlib, threading

from app import db, app
from app.models import User, Game, Stat, Input
from app.models.stat import get_placements
from app.tasks.metrics import upload_stat_tracker_metrics
from celery import chain
from celery.utils.log import get_task_logger
from redis import Redis

logger = get_task_logger(__name__)

redis = Redis(host='redis', port=6379)
api_success_lock = threading.Lock()
api_failure_lock = threading.Lock()
games_played_lock = threading.Lock()

BR_STATS_URI = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?platform=pc&user_id={}'


def increment_api_success():
    api_success_lock.acquire()
    try:
        redis.set('stat_tracker_api_success', int(redis.get('stat_tracker_api_success')) + 1)
    finally:
        api_success_lock.release()


def increment_api_failures():
    api_failure_lock.acquire()
    try:
        redis.set('stat_tracker_api_errors', int(redis.get('stat_tracker_api_errors')) + 1)
    finally:
        api_failure_lock.release()


def increment_games_played():
    games_played_lock.acquire()
    try:
        redis.set('stat_tracker_games', int(redis.get('stat_tracker_games')) + 1)
    finally:
        games_played_lock.release()


@celery.task()
def stat_tracker():
    with app.app_context():
        # reset metrics
        start_time = time.time()
        redis.set('stat_tracker_games', 0)
        redis.set('stat_tracker_api_success', 0)
        redis.set('stat_tracker_api_errors', 0)

        chains = [
            chain(
                fortnite_api_lookup.s(u.uid),
                find_changed_stats.s(u.id),
                update_stats.s(),
                update_hash.s(u.id),
            ) for u in User.query.all()
        ]

        groupJob = celery.group(chains)
        result = groupJob.apply_async()

        while not result.ready():
            time.sleep(0.5)

        # collect metrics (not 100% accurate as redis isnt locked)
        end_time = time.time()
        games = int(redis.get('stat_tracker_games'))
        api_success = int(redis.get('stat_tracker_api_success'))
        api_errors = int(redis.get('stat_tracker_api_errors'))

        upload_stat_tracker_metrics.apply_async((end_time - start_time, games, api_success, api_errors))


@celery.task()
def fortnite_api_lookup(uid):
    with app.app_context():
        try:
            r = requests.get(BR_STATS_URI.format(uid), timeout=5)

            if r.status_code != 200:
                r.raise_for_status()

            increment_api_success()
            return r.json()

        except requests.exceptions.HTTPError as e:
            logger.error('fortnite_api_lookup: Error in fetching data for uid: {}'.format(uid))
            logger.error('fortnite_api_lookup: Message: {}'.format(str(e)))
            increment_api_failures()
            return
        except requests.exceptions.ConnectTimeout:
            logger.error('fortnite_api_lookup: Connect Timed out fetching data for uid: {}'.format(uid))
            increment_api_failures()
            return
        except requests.exceptions.ReadTimeout:
            logger.error('fortnite_api_lookup: Read Timed out fetching data for uid: {}'.format(uid))
            increment_api_failures()
            return


@celery.task()
def find_changed_stats(body, user_id):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        if body is None:
            return None, []

        # Something went wrong on the response?
        if 'overallData' not in body or 'data' not in body:
            logger.warn('BODY returned in invalid format {}'.format(user))
            return None, []

        # Only run updateds if the overallData is different
        overall_data = body.get('overallData', {})
        data_hash = hashlib.md5(json.dumps(overall_data, sort_keys=True).encode('utf-8')).hexdigest()
        if (user.last_known_data_hash == data_hash):
            logger.info('{} has had no changes!'.format(user))
            return None, []

        # Start going through the data, its mega nested
        data, changed_stats = body.get('data'), []
        for input_type, input_data in data.items():
            _input = Input.query.filter_by(user_id=user.id, input_type=input_type).first()

            if _input is None:
                logger.info('New Input Type for user: {}, input_type: {}'.format(user, input_type))
                _input = Input(user_id=user.id, input_type=input_type)
                db.session.add(_input)
                db.session.commit()

            for playlist, playlist_data in input_data.items():
                for mode, mode_data in playlist_data.items():
                    if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                        mode = playlist[7:]
                        playlist = 'default'

                    stat = _input.stats.filter_by(mode=mode, name=playlist).first()
                    if stat is None or stat.matchesplayed != mode_data.get('matchesplayed', 0):
                        changed_stats.append((_input.id, mode, playlist, mode_data))

        return data_hash, changed_stats


@celery.task()
def update_stats(args):
    data_hash, changed_stats = args

    with app.app_context():
        for input_id, mode, playlist, data in changed_stats:
            _input = Input.query.filter_by(id=input_id).first()
            stat = _input.stats.filter_by(mode=mode, name=playlist).first()

            just_created = False
            if stat is None:
                logger.info('No Stat {}--{} for user {} with {} \n Creating...'.format(
                    playlist, mode, _input.user, _input))
                stat = Stat(
                    input_id=input_id,
                    name=playlist,
                    mode=mode,
                    matchesplayed=0,
                    kills=0,
                    placements=dict(),
                    is_ltm=(playlist != 'default'))
                just_created = True
                db.session.add(stat)

            if stat.matchesplayed < data.get('matchesplayed', 0) and not just_created:
                game = create_game(stat, data)
                if game is not None:
                    db.session.add(game)

                stat.placements = get_placements(data)
                stat.kills = data.get('kills', 0)
                stat.matchesplayed = data.get('matchesplayed', 0)
                stat.playersoutlived = data.get('playersoutlived', 0)
                stat.minutesplayed = data.get('minutesplayed', 0)
                stat.updated_at = datetime.datetime.now()

        db.session.commit()
        return data_hash


def create_game(stat, data):
    logger.info('Creating game for {} with {} in {}'.format(stat.input.user, stat.input, stat))
    increment_games_played()

    stat_placements = stat.placements
    if type(stat_placements) is list:
        stat_placements = stat_placements[0]

    placements = get_placements(data)
    placement = 'Loss'
    place = 101

    # Go thru our placements
    for key, value in placements.items():
        # If this placement is less than the other one that means its calculating
        if (stat_placements.get(key, 0) < value):
            # Get the placement number
            new_place = int(re.findall(r'\d+', key)[0])
            # If its less than it is more important
            # place 1 is better than place 3, but place1 affects place 3
            if new_place < place:
                place = new_place

    if place == 1:
        placement = 'Victory'
    elif place != 101:
        placement = 'Top {}'.format(place)

    kills = data.get('kills', 0) - stat.kills

    if kills >= 0 and kills <= 99:
        return Game(stat_id=stat.id, placement=placement, kills=kills)

    return None


@celery.task()
def update_hash(data_hash, id):
    if data_hash is None:
        return

    with app.app_context():
        user = User.query.get(id)

        logger.warn('User {} updated. Setting hash to {}'.format(user, data_hash))

        user.last_known_data_hash = str(data_hash)
        user.updated_at = datetime.datetime.now()
        db.session.commit()
