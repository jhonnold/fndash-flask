from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks.game_tracker', 'app.tasks.kd_monitor')
    CELERY_TASK_RESULT_EXPIRES = 60
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json', 'msgpack', 'yaml']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        'game_tracker': {
            'task': 'app.tasks.game_tracker.check_games',
            # Every minute for watching games
            'schedule': crontab(minute="*"),
        },
        'kd_monitor': {
            'task': 'app.tasks.kd_monitor.record_stats',
            # Everyday store current stats
            'schedule': crontab(hour="*/24"),
        },
    }
