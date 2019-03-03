import datetime

from functools import reduce
from flask import Blueprint, jsonify, request
from app.models import User, Game
from app.util import get_user, kd_per_day, games_per_day

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


@api.route('/users/<user_id>')
def user(user_id):
    user = get_user(user_id)
    stats = request.args.get('stats')
    stats = (stats == 'true')
    
    user_data = user.serialize(include_stats=stats)
    return jsonify(user_data)


@api.route('/users/<user_id>/kd')
def kds(user_id):
    user = get_user(user_id)
    mode = request.args.get('m', 'all')

    labels, datasets = kd_per_day(user, mode)

    return jsonify(dict(labels=labels, datasets=datasets))


@api.route('/users/<user_id>/placements')
def placements(user_id):
    user = get_user(user_id)

    return jsonify(
        dict(
            solo=user.placements_solo(),
            duo=user.placements_duo(),
            squad=user.placements_squad(),
        ))


@api.route('/users/<user_id>/game_counts')
def game_counts(user_id):
    user = get_user(user_id)
    mode = request.args.get('m', 'all')

    labels, datasets = games_per_day(user, mode)

    return jsonify(dict(labels=labels, datasets=datasets))


@api.route("/users/<user_id>/games")
def games(user_id):
    user = get_user(user_id)
    mode = request.args.get('m', 'all')

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


@api.route("/users/<user_id>/time_played")
def time_played(user_id):
    user = get_user(user_id)
    total = round(user.hoursplayed_total, 2)
    hours_solo = round(user.minutesplayed_solo / 60, 2)
    hours_duo = round(user.minutesplayed_duo / 60, 2)
    hours_squad = round(user.minutesplayed_squad / 60, 2)

    return jsonify(dict(
        labels=['Solo Hours', 'Duo Hours', 'Squad Hours'], 
        datasets=[[hours_solo, hours_duo, hours_squad]]))
