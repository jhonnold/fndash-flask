import celery, os, time

from celery.utils.log import get_task_logger
from boto.ec2 import cloudwatch
from boto.utils import get_instance_metadata
from app.util import metrics

logger = get_task_logger(__name__)


@celery.task()
def upload_stat_tracker_metrics():

    run_time = time.time() - metrics.start_time

    logger.warn('*' * 80)
    logger.warn('time: {}'.format(run_time))
    logger.warn('{}'.format(metrics))
    logger.warn('*' * 80)

    metadata = get_instance_metadata(timeout=1, num_retries=1)
    instance_id = metadata.get('instance-id')

    if instance_id is None:
        logger.warn('This is not an EC2 Instance, not uploading stats')
        return

    region = metadata.get('placement').get('availability-zone')[0:-1]

    cw = cloudwatch.connect_to_region(region)
    app_name = os.environ.get('APP_NAME').capitalize()

    metric_name = 'StatTrackerTime{}'.format(app_name)
    cw.put_metric_data('FNDash', metric_name, run_time, unit='Seconds', dimensions={"InstanceId": instance_id})

    metric_name = 'StatTrackerGames{}'.format(app_name)
    cw.put_metric_data(
        'FNDash', metric_name, metrics.get('games', 0), unit='Count', dimensions={"InstanceId": instance_id})

    metric_name = 'StatTrackerAPISuccess{}'.format(app_name)
    cw.put_metric_data(
        'FNDash', metric_name, metrics.get('api_successes', 0), unit='Count', dimensions={"InstanceId": instance_id})

    metric_name = 'StatTrackerAPIErrors{}'.format(app_name)
    cw.put_metric_data(
        'FNDash', metric_name, metrics.get('api_failures', 0), unit='Count', dimensions={"InstanceId": instance_id})
