from celery import Celery
from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks')
    CELERY_TASK_RESULT_EXPIRES = 120
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        'stat_tracker': {
            'task': 'stat_tracker',
            'schedule': crontab(minute='*/2'),
        },
        'record_stats': {
            'task': 'record_stats',
            'schedule': crontab(hour='0', minute='0'),
        }
    }

def create_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    celery.config_from_object(CeleryConfig)

    return celery

