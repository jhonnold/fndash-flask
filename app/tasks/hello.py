import celery

from app import User

@celery.task()
def print_hello():
  users = User.query.all()
  logger = print_hello.get_logger()
  logger.info('Hello, World!')
  logger.info(users)