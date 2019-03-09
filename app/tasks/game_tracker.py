import celery, requests

from app import db, app
from app.models import User, Game
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
def update_old_user_stats(json, user_id):
    with app.app_context():
        user = User.query.filter_by(id=user_id).first()

        if json is None or 'error' in json:
            # Simply didn't get anything back
            logger.warn('[OLD STATS] There was an error in fetching data for {}'.format(user))
            return

        total_stats = json['overallData']['defaultModes']

        keyboardmouse_data = json['data']['keyboardmouse']
        solo_stats = keyboardmouse_data['defaultsolo']['default']
        duo_stats = keyboardmouse_data['defaultduo']['default']
        squad_stats = keyboardmouse_data['defaultsquad']['default']

        if solo_stats['matchesplayed'] != user.matchesplayed_solo:
            logger.debug('{} played a solo game'.format(user))
            placement = 'Loss'
            if user.placetop1_solo != solo_stats.get('placetop1', 0):
                placement = 'Victory'
            elif user.placetop10_solo != solo_stats.get('placetop10', 0):
                placement = 'Top 10'
            elif user.placetop25_solo != solo_stats.get('placetop25', 0):
                placement = 'Top 25'

            kills = solo_stats['kills'] - user.kills_solo
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Solo',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_solo = solo_stats.get('kills', 0)
            user.placetop1_solo = solo_stats.get('placetop1', 0)
            user.placetop10_solo = solo_stats.get('placetop10', 0)
            user.placetop25_solo = solo_stats.get('placetop25', 0)
            user.matchesplayed_solo = solo_stats.get('matchesplayed', 0)
            user.minutesplayed_solo = solo_stats.get('minutesplayed', 0)
            user.lastmodified_solo = solo_stats.get('lastmodified', 0)

        if duo_stats['matchesplayed'] != user.matchesplayed_duo:
            logger.debug('{} played a duo game'.format(user))
            placement = 'Loss'
            if user.placetop1_duo != duo_stats.get('placetop1', 0):
                placement = 'Victory'
            elif user.placetop5_duo != duo_stats.get('placetop5', 0):
                placement = 'Top 5'
            elif user.placetop12_duo != duo_stats.get('placetop12', 0):
                placement = 'Top 12'

            kills = duo_stats['kills'] - user.kills_duo
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Duo',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_duo = duo_stats.get('kills', 0)
            user.placetop1_duo = duo_stats.get('placetop1', 0)
            user.placetop5_duo = duo_stats.get('placetop5', 0)
            user.placetop12_duo = duo_stats.get('placetop12', 0)
            user.matchesplayed_duo = duo_stats.get('matchesplayed', 0)
            user.minutesplayed_duo = duo_stats.get('minutesplayed', 0)
            user.lastmodified_duo = duo_stats.get('lastmodified', 0)

        if squad_stats['matchesplayed'] != user.matchesplayed_squad:
            logger.debug('{} played a squad game'.format(user))
            placement = 'Loss'
            if user.placetop1_squad != squad_stats.get('placetop1', 0):
                placement = 'Victory'
            elif user.placetop3_squad != squad_stats.get('placetop3', 0):
                placement = 'Top 3'
            elif user.placetop6_squad != squad_stats.get('placetop6', 0):
                placement = 'Top 6'

            kills = squad_stats['kills'] - user.kills_squad
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Squad',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_squad = squad_stats.get('kills', 0)
            user.placetop1_squad = squad_stats.get('placetop1', 0)
            user.placetop3_squad = squad_stats.get('placetop3', 0)
            user.placetop6_squad = squad_stats.get('placetop6', 0)
            user.matchesplayed_squad = squad_stats.get('matchesplayed', 0)
            user.minutesplayed_squad = squad_stats.get('minutesplayed', 0)
            user.lastmodified_squad = squad_stats.get('lastmodified', 0)

        if total_stats['matchesplayed'] != user.matchesplayed_total:
            user.kills_total = total_stats.get('kills', 0)
            user.wins_total = total_stats.get('placetop1', 0)
            user.matchesplayed_total = total_stats.get('matchesplayed', 0)

        db.session.commit()

@celery.task(ignore_result=True)
def check_games():
    with app.app_context():
        users = User.query.all()

        for user in users:
            logger.info('Starting to update info for {}'.format(user))
            get_user_from_fortnite_api.apply_async(
                (USER_STATS_ENDPOINT.format(user.uid), ),
                link=update_old_user_stats.s(user.id))
