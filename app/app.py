import os

from flask import Flask, Response
from flask_cors import CORS

from .config import DevConfig, ProdConfig


def create_app():
    app = Flask(__name__)
    CORS(app)

    if os.environ.get('FLASK_ENV') == 'production':
        app.config.from_object(ProdConfig)
    else:
        app.config.from_object(DevConfig)

    return app