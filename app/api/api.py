from flask import Blueprint, jsonify
from app.models import User

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/')
def home():
  return jsonify(foo='bar')

@api.route('/users')
def users():
  users = User.query.all()
  serialize_user = lambda user: dict(id=user.id, username=user.username)
  serialized_users = list(map(serialize_user, users))
  return jsonify(serialized_users)