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
            if user.placetop1_solo != solo_stats['placetop1']:
                placement = 'Victory'
            elif user.placetop10_solo != solo_stats['placetop10']:
                placement = 'Top 10'
            elif user.placetop25_solo != solo_stats['placetop25']:
                placement = 'Top 25'

            kills = solo_stats['kills'] - user.kills_solo
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Solo',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_solo = solo_stats['kills']
            user.placetop1_solo = solo_stats['placetop1']
            user.placetop10_solo = solo_stats['placetop10']
            user.placetop25_solo = solo_stats['placetop25']
            user.matchesplayed_solo = solo_stats['matchesplayed']
            user.minutesplayed_solo = solo_stats['minutesplayed']
            user.lastmodified_solo = solo_stats['lastmodified']

        if duo_stats['matchesplayed'] != user.matchesplayed_duo:
            logger.debug('{} played a duo game'.format(user))
            placement = 'Loss'
            if user.placetop1_duo != duo_stats['placetop1']:
                placement = 'Victory'
            elif user.placetop5_duo != duo_stats['placetop5']:
                placement = 'Top 5'
            elif user.placetop12_duo != duo_stats['placetop12']:
                placement = 'Top 12'

            kills = duo_stats['kills'] - user.kills_duo
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Duo',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_duo = duo_stats['kills']
            user.placetop1_duo = duo_stats['placetop1']
            user.placetop5_duo = duo_stats['placetop5']
            user.placetop12_duo = duo_stats['placetop12']
            user.matchesplayed_duo = duo_stats['matchesplayed']
            user.minutesplayed_duo = duo_stats['minutesplayed']
            user.lastmodified_duo = duo_stats['lastmodified']

        if squad_stats['matchesplayed'] != user.matchesplayed_squad:
            logger.debug('{} played a squad game'.format(user))
            placement = 'Loss'
            if user.placetop1_squad != squad_stats['placetop1']:
                placement = 'Victory'
            elif user.placetop3_squad != squad_stats['placetop3']:
                placement = 'Top 3'
            elif user.placetop6_squad != squad_stats['placetop6']:
                placement = 'Top 6'

            kills = squad_stats['kills'] - user.kills_squad
            if kills >= 0 and kills <= 99:
                game = Game(
                    user_id=user.id,
                    game_type='Squad',
                    kills=kills,
                    placement=placement)
                db.session.add(game)

            user.kills_squad = squad_stats['kills']
            user.placetop1_squad = squad_stats['placetop1']
            user.placetop3_squad = squad_stats['placetop3']
            user.placetop6_squad = squad_stats['placetop6']
            user.matchesplayed_squad = squad_stats['matchesplayed']
            user.minutesplayed_squad = squad_stats['minutesplayed']
            user.lastmodified_squad = squad_stats['lastmodified']

        if total_stats['matchesplayed'] != user.matchesplayed_total:
            user.kills_total = total_stats['kills']
            user.wins_total = total_stats['placetop1']
            user.matchesplayed_total = total_stats['matchesplayed']
            # These were removed?
            # user.hoursplayed_total = total_stats['hoursplayed']
            # user.lastmodified_total = total_stats['lastupdate']

        db.session.commit()
