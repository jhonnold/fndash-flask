import celery, requests, datetime, re, time, json

from app import db, app
from app.models import User, Game, Stat, Input
from app.models.stat import get_placements
from app.tasks.metrics import upload_stat_tracker_metrics
from celery.utils.log import get_task_logger
from redis import Redis

logger = get_task_logger(__name__)

redis = Redis(host='redis', port=6379)

BASE_URL = 'https://fortnite-public-api.theapinetwork.com/prod09'
USER_STATS_ENDPOINT = BASE_URL + '/users/public/br_stats_v2?platform=pc&user_id={}'


@celery.task()
def stat_tracker():
    with app.app_context():
        # reset metrics
        start_time = time.time()
        redis.set('stat_tracker_games', 0)
        redis.set('stat_tracker_api_success', 0)
        redis.set('stat_tracker_api_errors', 0)

        users = User.query.limit(10).all()
        groupJob = celery.group(
            fortnite_api_lookup.s(u.id, u.uid) for u in users)
        result = groupJob.apply_async()

        while not result.ready():
            time.sleep(0.1)

        # collect metrics (not 100% accurate as redis isnt locked)
        end_time = time.time()
        games = int(redis.get('stat_tracker_games'))
        api_success = int(redis.get('stat_tracker_api_success'))
        api_errors = int(redis.get('stat_tracker_api_errors'))

        upload_stat_tracker_metrics.apply_async((end_time - start_time, games,
                                                 api_success, api_errors))


@celery.task()
def fortnite_api_lookup(user_id, uid):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        try:
            r = requests.get(USER_STATS_ENDPOINT.format(uid), timeout=5)

            if r.status_code != 200:
                r.raise_for_status()

            redis.set('stat_tracker_api_success',
                      int(redis.get('stat_tracker_api_success')) + 1)

            body = r.json()
            update_user_stats.apply((body, user_id))
            return

        except requests.exceptions.HTTPError as e:
            logger.error(
                'fortnite_api_lookup: Error in fetching data for user: {} - uid: {}'
                .format(user, uid))
            logger.error('fortnite_api_lookup: Message: {}'.format(str(e)))
            redis.set('stat_tracker_api_errors',
                      int(redis.get('stat_tracker_api_errors')) + 1)
            return
        except requests.exceptions.ConnectTimeout:
            logger.error(
                'fortnite_api_lookup: Connect Timed out fetching data for user: {} - uid: {}'
                .format(user, uid))
            redis.set('stat_tracker_api_errors',
                      int(redis.get('stat_tracker_api_errors')) + 1)
            return
        except requests.exceptions.ReadTimeout:
            logger.error(
                'fortnite_api_lookup: Read Timed out fetching data for user: {} - uid: {}'
                .format(user, uid))
            redis.set('stat_tracker_api_errors',
                      int(redis.get('stat_tracker_api_errors')) + 1)
            return


@celery.task()
def update_user_stats(body, user_id):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        # Something went wrong on the response?
        if body is None or 'overallData' not in body or 'data' not in body:
            logger.warn('BODY returned in invalid format {}'.format(user))
            logger.warn(body)
            return

        # Only run updateds if the overallData is different
        overall_data = body.get('overallData', {})
        data_hash = hash(json.dumps(overall_data, sort_keys=True))
        prev_data_hash = redis.get('{}_data_hash'.format(user.id))

        if (prev_data_hash is not None and int(prev_data_hash) == data_hash):
            logger.info('{} has had no changes!'.format(user))
            return

        redis.set('{}_data_hash'.format(user.id), data_hash)

        # Start going through the data, its mega nested
        data, jobs = body.get('data'), []
        for input_type in data.keys():
            _input = Input.query.filter_by(
                user_id=user.id, input_type=input_type).first()

            if _input is None:
                logger.info(
                    'Seeing new data for {} with input type: {}'.format(
                        user, input_type))
                _input = Input(user_id=user.id, input_type=input_type)
                db.session.add(_input)
                db.session.commit()

            input_data = data.get(input_type)

            for playlist in input_data.keys():
                playlist_data = input_data.get(playlist)

                for mode in playlist_data.keys():
                    mode_data = playlist_data.get(mode)

                    if (playlist in [
                            'defaultsolo', 'defaultduo', 'defaultsquad'
                    ]):
                        mode = playlist[7:]
                        playlist = 'default'

                    # Add the update/create to the jobs array
                    jobs.append(
                        update_or_create_stat.s(_input.id, mode, playlist,
                                                mode_data))

        groupJob = celery.group(jobs)
        result = groupJob.apply_async()

        while not result.ready():
            time.sleep(0.1)

        return


@celery.task()
def update_or_create_stat(input_id, mode, playlist, data):
    with app.app_context():
        _input = Input.query.filter_by(id=input_id).first()
        stat = _input.stats.filter_by(mode=mode, name=playlist).first()

        just_created = False
        if stat is None:
            logger.info(
                'No Stat ({}/{}) for input: {}, user: {} \n Creating...'.
                format(playlist, mode, _input, _input.user))
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

        if stat.matchesplayed < data.get('matchesplayed',
                                         0) and not just_created:
            game = create_game(stat, data)
            if game is not None:
                db.session.add(game)

            stat.placements = get_placements(data)
            stat.kills = data.get('kills', 0)
            stat.matchesplayed = data.get('matchesplayed', 0)
            stat.playersoutlived = data.get('playersoutlived', 0)
            stat.minutesplayed = data.get('minutesplayed', 0)
            stat.updated = datetime.datetime.now()

        db.session.commit()

    return None


def create_game(stat, data):
    logger.info('Creating game for {}, in playlist/mode - {}/{}'.format(
        stat.input.user, stat.name, stat.mode))
    redis.set('stat_tracker_games', int(redis.get('stat_tracker_games')) + 1)

    stat_placements = stat.placements
    if type(stat_placements) is list:
        stat_placements = stat_placements[0]

    placements = get_placements(data)
    placement = 'Loss'
    place = 101

    # Go thru our placements
    for key in placements.keys():
        # If this placement is less than the other one that means its calculating
        if (stat_placements.get(key, 0) < placements.get(key)):
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
