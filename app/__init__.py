import datetime

from flask import Flask, render_template, redirect, url_for
from flask_assets import Environment, Bundle
from celery import Celery
from app.database import db
from app.config import DevConfig
from app.celeryconfig import CeleryConfig
from app.modules import dashboard
from . import filters


def create_app(name=__name__):
    app = Flask(__name__)
    app.config.from_object(DevConfig)
    db.init_app(app)
    register_assets(app)
    app.register_blueprint(dashboard)
    filters.init_app(app)
    celery = make_celery(app)

    return app, celery


def register_assets(app):
    assets = Environment(app)
    assets.config['AUTOPREFIXER_BROWSERS'] = ['> 1%']

    js = Bundle(
        'foundation-sites-6.5.1/dist/js/foundation.min.js',
        'js/app.js',
        filters='jsmin',
        output='dist/main.bundle.js')
    assets.register('js_all', js)

    css = Bundle(
        'scss/main.scss',
        filters=['libsass', 'autoprefixer6'],
        output='dist/styles.css',
        depends='**/*.scss')
    assets.register('css_all', css)


def make_celery(app):
    # create context tasks in celery
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    celery.config_from_object(CeleryConfig)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask

    return celery
