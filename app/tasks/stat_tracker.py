import celery, requests, datetime

from app import db, app
from app.models import User, Game, Stat
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

BASE_URL = 'https://fortnite-public-api.theapinetwork.com/prod09'
USER_STATS_ENDPOINT = BASE_URL + '/users/public/br_stats_v2?platform=pc&user_id={}'


def get_placements(stat):
    placements = dict()

    for key in stat.keys():
        if ('placetop' in key):
            placements[key] = stat.get(key)

    return placements


@celery.task(ignore_result=True)
def get_user_from_fortnite_api(url):
    with app.app_context():
        r = requests.get(url)
        r.raise_for_status()

        json = r.json()
        return json


@celery.task(ignore_result=True)
def update_user_stats(json, user_id):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        if json is None or 'error' in json:
            # Simply didn't get anything back
            logger.warn('There was an error in fetching data for {}'.format(user))
            return

        total_stats = json.get('overallData').get('defaultModes')
        user.kills_total = total_stats.get('kills', 0)
        user.wins_total = total_stats.get('placetop1', 0)
        user.matchesplayed_total = total_stats.get('matchesplayed', 0)

        pc_data = json.get('data').get('keyboardmouse')
        for playlist in pc_data.keys():
            for mode in pc_data.get(playlist, dict()).keys():
                mode_data = pc_data.get(playlist).get(mode)

                if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                    mode = playlist[7:]
                    playlist = 'default'

                stat = user.stats.filter_by(mode=mode, name=playlist).first()

                if (stat is None):
                    logger.info('No stat for {} regarding {}/{}'.format(
                        user, playlist, mode))
                    logger.info('Creating...')
                    stat = Stat(
                        user_id=user.id,
                        name=playlist,
                        mode=mode,
                        is_ltm=True,
                        placements=get_placements(mode_data),
                        kills=mode_data.get('kills', 0),
                        matchesplayed=mode_data.get('matchesplayed', 0),
                        playersoutlived=mode_data.get('playersoutlived', 0),
                        minutesplayed=mode_data.get('minutesplayed', 0))
                    db.session.add(stat)
                    continue

                if (mode_data.get('matchesplayed', 0) != stat.matchesplayed):
                    stat.placements = get_placements(mode_data),
                    stat.kills = mode_data.get('kills', 0)
                    stat.matchesplayed = mode_data.get('matchesplayed', 0)
                    stat.playersoutlived = mode_data.get('playersoutlived', 0)
                    stat.minutesplayed = mode_data.get('minutesplayed', 0)
                    stat.updated = datetime.datetime.now()

            db.session.commit()


@celery.task(ignore_result=True)
def stat_tracker():
    with app.app_context():
        users = User.query.all()

        for user in users:
            logger.info('Starting to update info for {}'.format(user))
            get_user_from_fortnite_api.apply_async(
                (USER_STATS_ENDPOINT.format(user.uid), ),
                link=update_user_stats.s(user.id))