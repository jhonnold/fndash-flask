import celery, requests, datetime

from app import db, app
from app.models import User, Game, Stat
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

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
            stat = Stat(user_id=user_id, name=playlist, mode=mode)
            stat.update(data)
            db.session.add(stat)
        else:
            stat.update(data)

        db.session.commit()


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

        total_stats = json.get('overallData').get('defaultModes')
        user.kills_total = total_stats.get('kills', 0)
        user.wins_total = total_stats.get('placetop1', 0)
        user.matchesplayed_total = total_stats.get('matchesplayed', 0)

        input_types = json.get('data')
        if 'keyboardmouse' not in input_types:
            logger.warn('User {} has no keyboardmouse data'.format(user))
            return

        pc_data = input_types.get('keyboardmouse')
        for playlist in pc_data.keys():
            for mode in pc_data.get(playlist).keys():
                mode_data = pc_data.get(playlist).get(mode)

                if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                    mode = playlist[7:]
                    playlist = 'default'

                update_or_create_stat.apply_async((user.id, mode, playlist,
                                                   mode_data))


@celery.task(ignore_result=True)
def stat_tracker():
    with app.app_context():
        users = User.query.all()

        for user in users:
            logger.info('Starting to update info for {}'.format(user))
            get_user_from_fortnite_api.apply_async(
                (USER_STATS_ENDPOINT.format(user.uid), ),
                link=update_user_stats.s(user.id))