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

@api.route("/users/<user_id>")
def user(user_id):
  user = User.query.filter_by(id=user_id).first()
  user_data = dict(**user.__dict__)
  if '_sa_instance_state' in user_data:
    del user_data['_sa_instance_state']

  return jsonify(user_data)