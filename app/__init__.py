import datetime, os

from flask import Flask, Response
from flask_cors import CORS
from celery import Celery

from .config import DevConfig, ProdConfig
from .celery import CeleryConfig
from .api import api
from .database import db

app = Flask(__name__)
CORS(app)

if os.environ.get('FLASK_ENV') == 'production':
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(DevConfig)

db.init_app(app)
app.register_blueprint(api)

celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)
celery.config_from_object(CeleryConfig)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return Response('<h1>FN Dash is currently under development</h1>')