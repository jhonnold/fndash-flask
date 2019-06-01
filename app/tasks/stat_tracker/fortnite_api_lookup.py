import celery, requests, os

from app.util import metrics
from app.tasks import AppContextBase
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)
BR_STATS_URI = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?platform=pc&user_id={}'


@celery.task(base=AppContextBase, bind=True, name="fortnite_api_lookup")
def fortnite_api_lookup(self, uid):
    try:
        r = requests.get(BR_STATS_URI.format(uid), timeout=30, headers={'Authorization': os.getenv('FORTNITE_API_AUTH')})
        if r.status_code != 200:
            r.raise_for_status()

        metrics.inc('api_successes')
        return r.json()
    except Exception as e:
        logger.error('fortnite_api_lookup: {}'.format(str(e)))
        metrics.inc('api_failures')
        return