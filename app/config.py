class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_POOL_SIZE = 25
    SQLALCHEMY_POOL_TIMEOUT = 45
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@postgres:5432/fndash'


class ProdConfig(Config):
    DEBUG = False
    SQLALCHEMY_ECHO = False
    CELERY_BROKER_URL = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis:6379/0'


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@postgres/fndash-dev'
    SQLALCHEMY_ECHO = True
    CELERY_BROKER_URL = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis:6379/0'
