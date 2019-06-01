import celery, datetime

from app import db
from app.tasks import AppContextBase
from app.models import User
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@celery.task(base=AppContextBase, name="update_hash")
def update_hash(data_hash, id):
    if data_hash is None:
        return

    user = User.query.get(id)

    logger.warn('User {} updated. Setting hash to {}'.format(user, data_hash))

    user.last_known_data_hash = str(data_hash)
    user.updated_at = datetime.datetime.now()
    db.session.commit()