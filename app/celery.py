from celery.schedules import crontab


class CeleryConfig(object):
    CELERY_IMPORTS = ('app.tasks.game_tracker', 'app.tasks.kd_monitor',
                      'app.tasks.user_monitor', 'app.tasks.stat_tracker')
    CELERY_TASK_RESULT_EXPIRES = 60
    CELERY_TIMEZONE = 'UTC'

    CELERY_ACCEPT_CONTENT = ['json', 'msgpack', 'yaml']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'

    CELERYBEAT_SCHEDULE = {
        # 'game_tracker': {
        #     'task': 'app.tasks.game_tracker.check_games',
        #     'schedule': crontab(minute='*'),
        # },
        'stat_tracker': {
            'task': 'app.tasks.stat_tracker.stat_tracker',
            'schedule': crontab(minute='*'),
        },
        'kd_monitor': {
            'task': 'app.tasks.kd_monitor.record_stats',
            'schedule': crontab(hour='5', minute='0'),
        },
        'user_monitor': {
            'task': 'app.tasks.user_monitor.record_user',
            'schedule': crontab(hour='5', minute='0'),
        }
    }
