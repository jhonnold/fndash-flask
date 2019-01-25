import celery

@celery.task()
def record_stats():
  logger = record_stats.get_logger();
  logger.info('Recording stats for all users...')