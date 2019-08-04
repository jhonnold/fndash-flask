from flask_restless import APIManager
from app.database import db
from app.models import User, Input, Stat, Game, StatHistory

api_preferences = {
  'methods': ['GET'],
  'results_per_page': 25
}

def create_api_manager(app):
    api_manager = APIManager(app=app, flask_sqlalchemy_db=db)

    api_manager.create_api(User, collection_name='users', **api_preferences)
    api_manager.create_api(Input, collection_name='inputs', **api_preferences)
    api_manager.create_api(Stat, collection_name='stats', **api_preferences)
    api_manager.create_api(Game, collection_name='games', **api_preferences)
    api_manager.create_api(StatHistory, collection_name='histories', **api_preferences)

    return api_manager

