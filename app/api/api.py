import datetime, requests

from functools import reduce
from sqlalchemy import exc
from sqlalchemy.orm import joinedload
from flask import Blueprint, jsonify, request, current_app, Response, abort
from app.models import User, Game
from app.util import get_user, kd_per_day, games_per_day
from app.database import db

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/')
def home():
    return jsonify(foo='bar')


@api.route('/active_users')
def active_users():
    time = datetime.datetime.now() - datetime.timedelta(minutes=25)
    results = db.session.query(
        User, Game).join(Game).filter(Game.time_played >= time).distinct(
            User.id).all()

    serialized_users = list(
        map(
            lambda r: dict(
                username=r.User.username,
                id=r.User.id,
                playedAt=r.Game.time_played), results))

    return jsonify(
        sorted(
            serialized_users, key=lambda k: k.get('playedAt', 0),
            reverse=True))


@api.route('/recent_games')
def recent_games():
    games = db.session.query(Game).options(joinedload(Game.user)).order_by(
        Game.time_played.desc()).limit(20).all()

    serialized_recent_games = list(
        map(
            lambda game: dict(
                mode=game.mode,
                playlist=game.playlist,
                username=game.user.username,
                kills=game.kills,
                placement=game.placement,
                time_played=game.time_played), games))

    return jsonify(serialized_recent_games)


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
        games = user.games.filter_by(mode=mode).order_by(
            Game.time_played.desc()).limit(100).all()
    else:
        games = user.games.order_by(Game.time_played.desc()).limit(100).all()

    serialized_games = list(map(lambda g: g.serialize(), games))

    return jsonify(serialized_games)


@api.route("/users/<user_id>/game_records")
def records(user_id):
    user = get_user(user_id)
    solo_record = user.games.filter_by(mode='solo').order_by(
        Game.kills.desc()).first()
    duo_record = user.games.filter_by(mode='duo').order_by(
        Game.kills.desc()).first()
    squad_record = user.games.filter_by(mode='squad').order_by(
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

    return jsonify(
        dict(
            labels=['Solo Hours', 'Duo Hours', 'Squad Hours'],
            datasets=[[hours_solo, hours_duo, hours_squad]]))


@api.route("/new_user", methods=["POST"])
def new_user():
    json = request.get_json()
    if ('username' not in json):
        abort(Response(response='No Username Received', status=400))

    username = json.get('username')

    base = 'https://fortnite-public-api.theapinetwork.com/prod09'
    endpoint = base + '/users/id?username={}'

    r = requests.get(endpoint.format(username))
    res_json = r.json()

    if res_json is None or 'error' in json:
        abort(
            Response(
                response='Unable to locate you on Fortniteapi', status=500))

    uid = res_json.get('uid')

    if uid is None:
        abort(
            Response(
                response='Unable to locate you on Fortniteapi', status=500))

    try:
        user = User(uid=uid, username=username)
        db.session.add(user)
        db.session.commit()
    except exc.IntegrityError:
        abort(Response(response='This user already exists!', status=500))

    return Response(status=200)