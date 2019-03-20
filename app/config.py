import dotenv, os

if not os.environ.get('CI'):
    dotenv.load_dotenv(verbose=True)


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')
    DB_NAME = os.getenv('DB_NAME')
    SQLALCHEMY_POOL_SIZE = 20
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}:5432/{}'.format(
        DB_USER, DB_PASS, DB_HOST, DB_NAME)


class ProdConfig(Config):
    DEBUG = False
    SQLALCHEMY_ECHO = False
    CELERY_BROKER_URL = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis:6379/0'


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@postgres/fndash-dev'
    SQLALCHEMY_ECHO = False
    CELERY_BROKER_URL = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis:6379/0'
