from flask import Flask, render_template
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
    'foundation-sites-6.5.1/dist/js/foundation.min.js',
    'js/app.js',
    filters='jsmin',
    output='dist/main.bundle.js')
assets.register('js_all', js)

css = Bundle(
    'scss/main.scss',
    filters=['libsass', 'autoprefixer6', 'cssmin'],
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
    lastmodified_solo = db.Column(db.Integer())
    kills_duo = db.Column(db.Integer())
    placetop1_duo = db.Column(db.Integer())
    placetop10_duo = db.Column(db.Integer())
    placetop25_duo = db.Column(db.Integer())
    matchesplayed_duo = db.Column(db.Integer())
    lastmodified_duo = db.Column(db.Integer())
    kills_squad = db.Column(db.Integer())
    placetop1_squad = db.Column(db.Integer())
    placetop3_squad = db.Column(db.Integer())
    placetop6_squad = db.Column(db.Integer())
    matchesplayed_squad = db.Column(db.Integer())
    lastmodified_squad = db.Column(db.Integer())

    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)


@app.route('/')
def home():
    users = User.query.all()
    selected_user = users[0]
    return render_template(
        'layout.html', users=users, selected_user=selected_user)


@app.route('/users/<user_id>')
def user_stats(user_id):
    users = User.query.all()
    selected_user = None
    
    for user in users:
        if (user.id == int(user_id)):
            selected_user = user
            break

    return render_template(
        'layout.html', users=users, selected_user=selected_user)
