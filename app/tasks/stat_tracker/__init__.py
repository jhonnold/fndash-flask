import celery, time

from app.util import metrics
from app.tasks import AppContextBase
from app.models import User
from celery import chain
from celery.utils.log import get_task_logger

from app.tasks import upload_stat_tracker_metrics
from .fortnite_api_lookup import fortnite_api_lookup
from .find_changed_stats import find_changed_stats
from .update_stats import update_stats
from .update_hash import update_hash

logger = get_task_logger(__name__)

@celery.task(base=AppContextBase, name="stat_tracker")
def stat_tracker():
    logger.warn('*' * 80)
    logger.warn('Starting stat_tracker')
    logger.warn('*' * 80)

    metrics.reset()

    chains = [
        chain(
            fortnite_api_lookup.s(u.uid),
            find_changed_stats.s(u.id),
            update_stats.s(),
            update_hash.s(u.id),
        ) for u in User.query.all()
    ]

    groupJob = celery.group(chains)
    result = groupJob.apply_async()
    
    while not result.ready():
        time.sleep(0.5)

    upload_stat_tracker_metrics.apply_async()