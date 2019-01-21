import datetime

from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment, Bundle
from celery import Celery
from .config import DevConfig
from .celeryconfig import CeleryConfig

app = Flask(__name__)
app.config.from_object(DevConfig)
db = SQLAlchemy(app)


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


celery = make_celery(app)

assets = Environment(app)
assets.config['AUTOPREFIXER_BROWSERS'] = ['> 1%']

js = Bundle(
    # This file is downloaded in the docker container
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


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(32), nullable=False, unique=True)
    username = db.Column(db.String(255))
    kills_total = db.Column(db.Integer())
    wins_total = db.Column(db.Integer())
    matchesplayed_total = db.Column(db.Integer())
    hoursplayed_total = db.Column(db.Integer())
    lastmodified_total = db.Column(db.Integer())
    kills_solo = db.Column(db.Integer())
    placetop1_solo = db.Column(db.Integer())
    placetop10_solo = db.Column(db.Integer())
    placetop25_solo = db.Column(db.Integer())
    matchesplayed_solo = db.Column(db.Integer())
    minutesplayed_solo = db.Column(db.Integer())
    lastmodified_solo = db.Column(db.Integer())
    kills_duo = db.Column(db.Integer())
    placetop1_duo = db.Column(db.Integer())
    placetop5_duo = db.Column(db.Integer())
    placetop12_duo = db.Column(db.Integer())
    matchesplayed_duo = db.Column(db.Integer())
    minutesplayed_duo = db.Column(db.Integer())
    lastmodified_duo = db.Column(db.Integer())
    kills_squad = db.Column(db.Integer())
    placetop1_squad = db.Column(db.Integer())
    placetop3_squad = db.Column(db.Integer())
    placetop6_squad = db.Column(db.Integer())
    matchesplayed_squad = db.Column(db.Integer())
    minutesplayed_squad = db.Column(db.Integer())
    lastmodified_squad = db.Column(db.Integer())

    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)

class Game(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    game_type = db.Column(db.String(6))
    time_played = db.Column(db.Integer(), default=datetime.datetime.now)
    kills = db.Column(db.Integer())
    placement = db.Column(db.String())

    def __repr__(self):
        return "<Game '{}' - '{}'>".format(self.game_type, self.time_played)

@app.route('/')
def home():
    users = User.query.all()
    return redirect(url_for('user_stats', user_id=users[0].id))


@app.route('/users/<user_id>')
def user_stats(user_id):
    users = User.query.all()
    selected_user = None
    
    for user in users:
        if (user.id == int(user_id)):
            selected_user = user
            break
    
    selected_user_data = dict(**selected_user.__dict__)
    if '_sa_instance_state' in selected_user_data:
        del selected_user_data['_sa_instance_state']

    kd_total = selected_user.kills_total / (selected_user.matchesplayed_total - selected_user.wins_total)
    selected_user_data['kd_total'] = "{0:0.3f}".format(kd_total)

    kd_solo = selected_user.kills_solo / (selected_user.matchesplayed_solo - selected_user.placetop1_solo)
    selected_user_data['kd_solo'] = "{0:0.3f}".format(kd_solo)

    kd_duo = selected_user.kills_duo / (selected_user.matchesplayed_duo - selected_user.placetop1_duo)
    selected_user_data['kd_duo'] = "{0:0.3f}".format(kd_duo)

    kd_squad = selected_user.kills_squad / (selected_user.matchesplayed_squad - selected_user.placetop1_squad)
    selected_user_data['kd_squad'] = "{0:0.3f}".format(kd_squad)

    return render_template(
        'layout.html', users=users, **selected_user_data)
