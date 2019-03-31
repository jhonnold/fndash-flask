import celery, os

from celery.utils.log import get_task_logger
from boto.ec2 import cloudwatch
from boto.utils import get_instance_metadata

logger = get_task_logger(__name__)

@celery.task()
def upload_stat_tracker_metrics(time, games_played, api_success, api_errors):

    logger.info('*' * 80)
    logger.info('Stats for this session:')
    logger.info('Duration: {}'.format(time))
    logger.info('Games Played: {}'.format(games_played))
    logger.info('FortniteAPI Successes: {}'.format(api_success))
    logger.info('FortniteAPI Errors: {}'.format(api_errors))
    logger.info('*' * 80)

    metadata = get_instance_metadata(timeout=1, num_retries=1)
    instance_id = metadata.get('instance-id')

    if instance_id is None:
        logger.warn('This is not an EC2 Instance, not uploading stats')
        return

    region = metadata.get('placement').get('availability-zone')[0:-1]

    cw = cloudwatch.connect_to_region(region)
    app_name = os.environ.get('APP_NAME').capitalize();

    metric_name = 'StatTrackerTime{}'.format(app_name)
    cw.put_metric_data(
        'FNDash',
        metric_name,
        time,
        unit='Seconds',
        dimensions={"InstanceId": instance_id}
    )

    metric_name = 'StatTrackerGames{}'.format(app_name)
    cw.put_metric_data(
        'FNDash',
        metric_name,
        games_played,
        unit='Count',
        dimensions={"InstanceId": instance_id}
    )

    metric_name = 'StatTrackerAPISuccess{}'.format(app_name)
    cw.put_metric_data(
        'FNDash',
        metric_name,
        api_success,
        unit='Count',
        dimensions={"InstanceId": instance_id}
    )

    metric_name = 'StatTrackerAPIErrors{}'.format(app_name)
    cw.put_metric_data(
        'FNDash',
        metric_name,
        api_errors,
        unit='Count',
        dimensions={"InstanceId": instance_id}
    )
