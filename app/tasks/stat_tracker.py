import celery, requests, datetime, re, time

from app import db, app
from app.models import User, Game, Stat
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
        time1 = time.time()

        # reset metrics
        redis.set('stat_tracker_games', 0)
        redis.set('stat_tracker_api_success', 0)
        redis.set('stat_tracker_api_errors', 0)

        users = User.query.all()

        groupJob = celery.group(
            fortnite_api_lookup.s(u.id, u.uid) for u in users)
        result = groupJob.apply_async()

        while not result.ready():
            pass

        time2 = time.time()

        games = int(redis.get('stat_tracker_games'))
        api_success = int(redis.get('stat_tracker_api_success'))
        api_errors = int(redis.get('stat_tracker_api_errors'))

        upload_stat_tracker_metrics.apply_async((time2 - time1, games, api_success, api_errors))


@celery.task()
def fortnite_api_lookup(user_id, uid):
    with app.app_context():
        try:
            r = requests.get(USER_STATS_ENDPOINT.format(uid), timeout=5)

            if r.status_code != 200:
                r.raise_for_status()

            redis.set('stat_tracker_api_success', int(redis.get('stat_tracker_api_success')) + 1)

            json = r.json()
            update_user_stats.apply((json, user_id))
            return

        except requests.exceptions.HTTPError as e:
            logger.error('fortnite_api_lookup: Error in fetching data for user_id: {} - uid: {}'.format(user_id, uid))
            logger.error('fortnite_api_lookup: Message: {}'.format(str(e)))
            redis.set('stat_tracker_api_errors', int(redis.get('stat_tracker_api_errors')) + 1)
            return
        except requests.exceptions.ConnectTimeout:
            logger.error('fortnite_api_lookup: Connect Timed out fetching data for user_id: {} - uid: {}'.format(user_id, uid))
            redis.set('stat_tracker_api_errors', int(redis.get('stat_tracker_api_errors')) + 1)
            return
        except requests.exceptions.ReadTimeout:
            logger.error('fortnite_api_lookup: Read Timed out fetching data for user_id: {} - uid: {}'.format(user_id, uid))
            redis.set('stat_tracker_api_errors', int(redis.get('stat_tracker_api_errors')) + 1)
            return


@celery.task()
def update_user_stats(json, user_id):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        if json is None:
            logger.error(
                'There was an error in fetching data for {}'.format(user))
            return

        if 'error' in json:
            logger.error(
                'There was an error in fetching data for {}'.format(user))
            logger.error(json.get('error'))
            return

        if 'overallData' not in json or 'data' not in json:
            logger.warn('JSON returned in invalid format {}'.format(user))
            logger.warn(json)
            return

        overall_data = json.get('overallData')

        default_modes_data = overall_data.get('defaultModes', {})
        ltm_modes_data = overall_data.get('ltmModes', {})
        large_team_data = overall_data.get('largeTeamModes', {})

        default_matchesplayed = redis.get('{}_user_default_matches'.format(
            user.id))
        ltm_matchesplayed = redis.get('{}_user_ltm_matches'.format(user.id))
        large_team_matchesplayed = redis.get(
            '{}_user_large_team_matches'.format(user.id))

        if (default_matchesplayed is not None and ltm_matchesplayed is not None
                and large_team_matchesplayed is not None):
            if (int(default_matchesplayed) == default_modes_data.get(
                    'matchesplayed', 0)
                    and int(ltm_matchesplayed) == ltm_modes_data.get(
                        'matchesplayed', 0)
                    and int(large_team_matchesplayed) == large_team_data.get(
                        'matchesplayed', 0)):
                logger.info('{} has had no changes!'.format(user))
                return

        redis.set('{}_user_default_matches'.format(user.id),
                  default_modes_data.get('matchesplayed', 0))
        redis.set('{}_user_ltm_matches'.format(user.id),
                  ltm_modes_data.get('matchesplayed', 0))
        redis.set('{}_user_large_team_matches'.format(user.id),
                  large_team_data.get('matchesplayed', 0))

        user.kills_total = default_modes_data.get('kills', 0)
        user.wins_total = default_modes_data.get('placetop1', 0)
        user.matchesplayed_total = default_modes_data.get('matchesplayed', 0)
        db.session.commit()

        input_types = json.get('data')
        if 'keyboardmouse' not in input_types:
            logger.warn('User {} has no keyboardmouse data'.format(user))
            return

        jobs = []
        pc_data = input_types.get('keyboardmouse')
        for playlist in pc_data.keys():
            playlist_data = pc_data.get(playlist)

            for mode in playlist_data.keys():
                mode_data = playlist_data.get(mode)

                if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                    mode = playlist[7:]
                    playlist = 'default'

                jobs.append(
                    update_or_create_stat.s(user_id, mode, playlist,
                                            mode_data))

        groupJob = celery.group(jobs)
        result = groupJob.apply_async()

        while not result.ready():
            pass

        return


@celery.task()
def update_or_create_stat(user_id, mode, playlist, data):
    with app.app_context():
        stat = Stat.query.filter_by(
            user_id=user_id, mode=mode, name=playlist).first()

        just_created = False
        if stat is None:
            logger.info('No Stat ({}/{}) for user_id: {}'.format(
                playlist, mode, user_id))
            logger.info('Creating...')
            stat = Stat(
                user_id=user_id,
                name=playlist,
                mode=mode,
                matchesplayed=0,
                kills=0,
                placements=dict(),
                is_ltm=(playlist != 'default'))
            just_created = True
            db.session.add(stat)

        if stat.matchesplayed < data.get('matchesplayed', 0):
            if not just_created:
                game = create_game(user_id, mode, playlist, stat, data)
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


def create_game(user_id, mode, playlist, stat, data):
    logger.info('Creating game for {}, in playlist/mode - {}/{}'.format(
        user_id, playlist, mode))
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
        return Game(
            user_id=user_id,
            mode=mode,
            playlist=playlist,
            placement=placement,
            kills=kills)

    return None
