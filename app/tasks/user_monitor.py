import celery

from app import db
from app.models import User, UserProgressionData


@celery.task()
def record_user():
    users = User.query.all()
    for user in users:
        data = UserProgressionData(
            user_id=user.id,
            kills_total=user.kills_total,
            wins_total=user.wins_total,
            matchesplayed_total=user.matchesplayed_total,
            hoursplayed_total=user.hoursplayed_total,
            lastmodified_total=user.lastmodified_total,
            kills_solo=user.kills_solo,
            placetop1_solo=user.placetop1_solo,
            placetop10_solo=user.placetop10_solo,
            placetop25_solo=user.placetop25_solo,
            matchesplayed_solo=user.matchesplayed_solo,
            minutesplayed_solo=user.minutesplayed_solo,
            lastmodified_solo=user.lastmodified_solo,
            kills_duo=user.kills_duo,
            placetop1_duo=user.placetop1_duo,
            placetop5_duo=user.placetop5_duo,
            placetop12_duo=user.placetop12_duo,
            matchesplayed_duo=user.matchesplayed_duo,
            minutesplayed_duo=user.minutesplayed_duo,
            lastmodified_duo=user.lastmodified_duo,
            kills_squad=user.kills_squad,
            placetop1_squad=user.placetop1_squad,
            placetop3_squad=user.placetop3_squad,
            placetop6_squad=user.placetop6_squad,
            matchesplayed_squad=user.matchesplayed_squad,
            minutesplayed_squad=user.minutesplayed_squad,
            lastmodified_squad=user.lastmodified_squad)

        db.session.add(data)

    db.session.commit()
