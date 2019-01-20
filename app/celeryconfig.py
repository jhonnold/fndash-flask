from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks.worker')
    CELERY_TASK_RESULT_EXPIRES = 60
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json', 'msgpack', 'yaml']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        'stats_update': {
            'task': 'app.tasks.worker.update_stats',
            # Every minute
            'schedule': crontab(minute="*"),
        }
    }
