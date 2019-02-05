import datetime

from functools import reduce
from flask import Blueprint, jsonify, request
from app.models import User, Game
from app.util import get_user, kd_per_day

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/')
def home():
    return jsonify(foo='bar')


@api.route('/users')
def users():
    users = User.query.all()
    serialized_users = list(
        map(lambda user: dict(id=user.id, username=user.username), users))
    return jsonify(serialized_users)


@api.route("/users/<user_id>")
def user(user_id):
    user = get_user(user_id)
    user_data = user.serialize()

    return jsonify(user_data)


@api.route("/users/<user_id>/kd")
def kds(user_id):
    user = get_user(user_id)
    mode = request.args.get('m')
    mode = 'all' if mode is None else mode

    labels, datasets = kd_per_day(user, mode)

    return jsonify(dict(labels=labels, datasets=datasets))


#kd_progression (We now return this as a datasets in kds so don't do me)!
#placements
#games per day


@api.route("/users/<user_id>/games")
def games(user_id):
    user = get_user(user_id)
    mode = request.args.get('m')
    mode = 'all' if mode is None else mode

    if mode != 'all':
        games = user.games.filter_by(game_type=mode.capitalize()).order_by(
            Game.time_played.desc()).limit(100).all()
    else:
        games = user.games.order_by(Game.time_played.desc()).limit(100).all()

    serialized_games = list(map(lambda g: g.serialize(), games))

    return jsonify(serialized_games)


@api.route("/users/<user_id>/game_records")
def records(user_id):
    user = get_user(user_id)
    solo_record = user.games.filter_by(game_type='Solo').order_by(
        Game.kills.desc()).first()
    duo_record = user.games.filter_by(game_type='Duo').order_by(
        Game.kills.desc()).first()
    squad_record = user.games.filter_by(game_type='Squad').order_by(
        Game.kills.desc()).first()

    return jsonify(
        solo=solo_record.serialize() if solo_record is not None else None,
        duo=duo_record.serialize() if duo_record is not None else None,
        squad=squad_record.serialize() if squad_record is not None else None)
