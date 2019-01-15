from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks.hello')
    CELERY_TASK_RESULT_EXPIRES = 30
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json', 'msgpack', 'yaml']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        'test-celery': {
            'task': 'app.tasks.hello.print_hello',
            # Every minute
            'schedule': crontab(minute="*"),
        }
    }
