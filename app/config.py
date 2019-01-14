class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProdConfig(Config):
    pass


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@postgres/fn-dash-development'
    SQLALCHEMY_ECHO = True
