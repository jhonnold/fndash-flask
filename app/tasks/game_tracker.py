import celery, requests

from app import db
from app.models import User, Game
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

BASE_URL = 'https://fortnite-public-api.theapinetwork.com/prod09'
USER_STATS_ENDPOINT = BASE_URL + '/users/public/br_stats_v2?platform=pc&user_id={}'


@celery.task()
def check_games():
    users = User.query.all()

    for user in users:
        r = requests.get(USER_STATS_ENDPOINT.format(user.uid))
        json = r.json()

        logger.info('Requesting user info for {}'.format(user))
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

            user.kills_solo = duo_stats.get('kills', 0)
            user.placetop1_solo = duo_stats.get('placetop1', 0)
            user.placetop10_solo = duo_stats.get('placetop10', 0)
            user.placetop25_solo = duo_stats.get('placetop25', 0)
            user.matchesplayed_solo = duo_stats.get('matchesplayed', 0)
            user.minutesplayed_solo = duo_stats.get('minutesplayed', 0)
            user.lastmodified_solo = duo_stats.get('lastmodified', 0)

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

            user.kills_solo = squad_stats.get('kills', 0)
            user.placetop1_solo = squad_stats.get('placetop1', 0)
            user.placetop10_solo = squad_stats.get('placetop10', 0)
            user.placetop25_solo = squad_stats.get('placetop25', 0)
            user.matchesplayed_solo = squad_stats.get('matchesplayed', 0)
            user.minutesplayed_solo = squad_stats.get('minutesplayed', 0)
            user.lastmodified_solo = squad_stats.get('lastmodified', 0)

        if total_stats['matchesplayed'] != user.matchesplayed_total:
            user.kills_total = total_stats.get('kills', 0)
            user.wins_total = total_stats.get('placetop1', 0)
            user.matchesplayed_total = total_stats.get('matchesplayed', 0)
            # These were removed?
            # user.hoursplayed_total = total_stats['hoursplayed']
            # user.lastmodified_total = total_stats['lastupdate']

        db.session.commit()
