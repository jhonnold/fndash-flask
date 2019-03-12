import celery, requests, datetime, re

from app import db, app
from app.models import User, Game, Stat
from app.models.stat import get_placements
from celery.utils.log import get_task_logger
from redis import Redis

logger = get_task_logger(__name__)

redis = Redis(host='redis', port=6379)

BASE_URL = 'https://fortnite-public-api.theapinetwork.com/prod09'
USER_STATS_ENDPOINT = BASE_URL + '/users/public/br_stats_v2?platform=pc&user_id={}'


@celery.task(ignore_result=True)
def get_user_from_fortnite_api(url):
    with app.app_context():
        r = requests.get(url)
        r.raise_for_status()

        json = r.json()
        return json


@celery.task(ignore_result=True)
def update_or_create_stat(user_id, mode, playlist, data):
    with app.app_context():
        stat = Stat.query.filter_by(
            user_id=user_id, mode=mode, name=playlist).first()

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
                is_ltm=(playlist != 'default'))
            db.session.add(stat)

        if stat.matchesplayed < data.get('matchesplayed', 0):
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


def create_game(user_id, mode, playlist, stat, data):
    logger.info('Creating game for {}, in playlist/mode - {}/{}'.format(
        user_id, playlist, mode))
               
    stat_placements = stat.placements 
    if type(stat_plaments) is list:
        stat_placements = stat_placements[0]   
       
    placements = get_placements(data)
    placement = 'Loss'
    for key in placements.keys():
        if (stat_placements.get(key, 0) < placements.get(key)):
            place = re.findall(r'\d+', key)[0]
            if place == '1':
                placement = 'Victory'
            else:
                placement = 'Top {}'.format(place)
            break

    kills = data.get('kills', 0) - stat.kills

    if kills >= 0 and kills <= 99:
        return Game(
            user_id=user_id,
            mode=mode,
            playlist=playlist,
            placement=placement,
            kills=kills)

    return None


@celery.task(ignore_result=True)
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
            logger.error(json.error)
            return

        if 'overallData' not in json or 'data' not in json:
            logger.warn('JSON returned in invalid format {}'.format(user))
            logger.warn(json)
            return

        overall_data = json.get('overallData')

        default_modes_data = overall_data.get('defaultModes')
        ltm_modes_data = overall_data.get('ltmModes')
        large_team_data = overall_data.get('largeTeamModes')

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

        pc_data = input_types.get('keyboardmouse')
        for playlist in pc_data.keys():
            playlist_data = pc_data.get(playlist)

            for mode in playlist_data.keys():
                mode_data = playlist_data.get(mode)

                if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                    mode = playlist[7:]
                    playlist = 'default'

                update_or_create_stat.apply((user_id, mode, playlist,
                                             mode_data))


@celery.task(ignore_result=True)
def stat_tracker():
    with app.app_context():
        users = User.query.all()

        for user in users:
            logger.info('Starting to update info for {}'.format(user))
            get_user_from_fortnite_api.apply(
                (USER_STATS_ENDPOINT.format(user.uid), ),
                link=update_user_stats.s(user.id))
