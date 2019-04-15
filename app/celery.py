from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks.game_tracker', 'app.tasks.kd_monitor',
                      'app.tasks.user_monitor', 'app.tasks.stat_tracker',
                      'app.tasks.stat_history', 'app.tasks.metrics')
    CELERY_TASK_RESULT_EXPIRES = 60
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json', 'msgpack', 'yaml']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        'stat_tracker': {
            'task': 'app.tasks.stat_tracker.stat_tracker',
            'schedule': crontab(minute='*/3'),
        },
        'kd_monitor': {
            'task': 'app.tasks.kd_monitor.record_stats',
            'schedule': crontab(hour='5', minute='0'),
        },
        'user_monitor': {
            'task': 'app.tasks.user_monitor.record_user',
            'schedule': crontab(hour='5', minute='0'),
        },
        'record_stats': {
            'task': 'app.tasks.stat_history.record_stats',
            'schedule': crontab(hour='0', minute='0'),
        }
    }
