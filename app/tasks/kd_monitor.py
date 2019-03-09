import celery

from app import db, app
from app.models import User, KD


@celery.task()
def record_stats():
    with app.app_context():
        users = User.query.all()
        for user in users:
            kd = KD(
                user_id=user.id,
                total=user.kd_total(),
                solo=user.kd_solo(),
                duo=user.kd_duo(),
                squad=user.kd_squad(),
            )

            db.session.add(kd)
        
        db.session.commit()
