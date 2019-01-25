import celery, requests

from app import db
from app.models import User, Game

API_LINK = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id={}&platform=pc'


@celery.task()
def check_games():
    users = User.query.all()
    for user in users:
        r = requests.get(API_LINK.format(user.uid))
        data = r.json()

        totals = data['totals']
        stats = data['stats']

        if totals['matchesplayed'] != user.matchesplayed_total:
            logger.info('There was a change in totals')
            user.kills_total = totals['kills']
            user.wins_total = totals['wins']
            user.matchesplayed_total = totals['matchesplayed']
            user.hoursplayed_total = totals['hoursplayed']
            user.lastmodified_total = totals['lastupdate']

        if stats['matchesplayed_solo'] != user.matchesplayed_solo:
            logger.info('There was a change in solos')
            placement = 'Loss'
            if user.placetop1_solo != stats['placetop1_solo']:
                placement = 'Victory'
            elif user.placetop10_solo != stats['placetop10_solo']:
                placement = 'Top 10'
            elif user.placetop25_solo != stats['placetop25_solo']:
                placement = 'Top 25'

            kills = stats['kills_solo'] - user.kills_solo
            game = Game(
                user_id=user.id,
                game_type='Solo',
                kills=kills,
                placement=placement)
            db.session.add(game)

            user.kills_solo = stats['kills_solo']
            user.placetop1_solo = stats['placetop1_solo']
            user.placetop10_solo = stats['placetop10_solo']
            user.placetop25_solo = stats['placetop25_solo']
            user.matchesplayed_solo = stats['matchesplayed_solo']
            user.minutesplayed_solo = stats['minutesplayed_solo']
            user.lastmodified_solo = stats['lastmodified_solo']

        if stats['matchesplayed_duo'] != user.matchesplayed_duo:
            logger.info('There was a change in duos')
            placement = 'Loss'
            if user.placetop1_duo != stats['placetop1_duo']:
                placement = 'Victory'
            elif user.placetop5_duo != stats['placetop5_duo']:
                placement = 'Top 5'
            elif user.placetop12_duo != stats['placetop12_duo']:
                placement = 'Top 12'

            kills = stats['kills_duo'] - user.kills_duo
            game = Game(
                user_id=user.id,
                game_type='Duo',
                kills=kills,
                placement=placement)
            db.session.add(game)

            user.kills_duo = stats['kills_duo']
            user.placetop1_duo = stats['placetop1_duo']
            user.placetop5_duo = stats['placetop5_duo']
            user.placetop12_duo = stats['placetop12_duo']
            user.matchesplayed_duo = stats['matchesplayed_duo']
            user.minutesplayed_duo = stats['minutesplayed_duo']
            user.lastmodified_duo = stats['lastmodified_duo']

        if stats['matchesplayed_squad'] != user.matchesplayed_squad:
            logger.info('There was a change in squads')
            placement = 'Loss'
            if user.placetop1_squad != stats['placetop1_squad']:
                placement = 'Victory'
            elif user.placetop3_squad != stats['placetop3_squad']:
                placement = 'Top 3'
            elif user.placetop6_squad != stats['placetop6_squad']:
                placement = 'Top 6'

            kills = stats['kills_squad'] - user.kills_squad
            game = Game(
                user_id=user.id,
                game_type='Squad',
                kills=kills,
                placement=placement)
            db.session.add(game)

            user.kills_squad = stats['kills_squad']
            user.placetop1_squad = stats['placetop1_squad']
            user.placetop3_squad = stats['placetop3_squad']
            user.placetop6_squad = stats['placetop6_squad']
            user.matchesplayed_squad = stats['matchesplayed_squad']
            user.minutesplayed_squad = stats['minutesplayed_squad']
            user.lastmodified_squad = stats['lastmodified_squad']

        db.session.commit()
