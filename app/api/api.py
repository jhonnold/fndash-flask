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

  user_data = dict()
  user_data['all'] = dict(
    wins=user.wins_total,
    matches=user.matchesplayed_total,
    kills=user.kills_total,
    kd=user.kd_total(),
  )

  user_data['solo'] = dict(
    wins=user.placetop1_solo,
    matches=user.matchesplayed_solo,
    kills=user.kills_solo,
    kd=user.kd_solo(),
  )

  user_data['duo'] = dict(
    wins=user.placetop1_duo,
    matches=user.matchesplayed_duo,
    kills=user.kills_duo,
    kd=user.kd_duo(),
  )

  user_data['squad'] = dict(
    wins=user.placetop1_squad,
    matches=user.matchesplayed_squad,
    kills=user.kills_squad,
    kd=user.kd_squad(),
  )

  user_data['id'] = user.id
  user_data['username'] = user.username
  user_data['uid'] = user.uid
  
  return jsonify(user_data)