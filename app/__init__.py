import os

from .app import create_app
from .celery import create_celery
from .database import db
from .api import create_api_manager

app = create_app()

db.init_app(app)
api_manager = create_api_manager(app)
celery = create_celery(app)
