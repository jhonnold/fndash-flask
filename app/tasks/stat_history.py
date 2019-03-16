import celery

from app import db, app
from app.models import Stat, StatHistory


@celery.task()
def record_stats():
    with app.app_context():
        stats = Stat.query.all()
        for stat in stats:
            stat = StatHistory(
              stat_id=stat.id,
              placements=stat.placements,
              kills=stat.kills,
              matchesplayed=stat.matchesplayed,
              playersoutlived=stat.playersoutlived,
              minutesplayed=stat.minutesplayed,
            )
            db.session.add(stat)
            db.session.commit()