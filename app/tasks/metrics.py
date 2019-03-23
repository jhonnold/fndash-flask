import celery, os

from celery.utils.log import get_task_logger
from boto.ec2 import cloudwatch
from boto.utils import get_instance_metadata

logger = get_task_logger(__name__)


def send_multi_metrics(instance_id,
                       region,
                       metrics,
                       namespace='EC2/FNDash',
                       unit='Seconds'):
    '''
    Send multiple metrics to CloudWatch
    metrics is expected to be a map of key -> value pairs of metrics
    '''
    cw = cloudwatch.connect_to_region(region)
    cw.put_metric_data(
        namespace,
        metrics.keys(),
        metrics.values(),
        unit=unit,
        dimensions={"InstanceId": instance_id})


@celery.task()
def upload_stat_tracker_metrics(time):
    metadata = get_instance_metadata(timeout=1, num_retries=1)
    instance_id = metadata.get('instance-id')

    if instance_id is None:
        logger.warn('This is not an EC2 Instance, not uploading stats')
        return

    region = metadata.get('placement').get('availability-zone')[0:-1]

    app_name = os.environ.get('APP_NAME')
    metric_name = 'StatTrackerTime{}'.format(app_name.captitalize())
    metrics = {metric_name: time}

    send_multi_metrics(instance_id, region, metrics)
