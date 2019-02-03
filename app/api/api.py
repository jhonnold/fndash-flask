from flask import Blueprint, jsonify
from app.models import User, Game
from app.util import get_user
from functools import reduce
import datetime

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
    user = get_user(user_id)

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


@api.route("/users/<user_id>/kd")
def kds(user_id):
    user = get_user(user_id)
    current_time_adjust = datetime.datetime.today() + datetime.timedelta(
        hours=-5)
    start_date = datetime.datetime(
        year=current_time_adjust.year,
        month=current_time_adjust.month,
        day=current_time_adjust.day) - datetime.timedelta(hours=-5)
    end_date = start_date + datetime.timedelta(days=1)

    labels = []
    kds = []

    for i in range(7):
        games = user.games.filter(Game.time_played >= start_date).filter(
            Game.time_played < end_date)

        kills = reduce(lambda t, g: t + g.kills, games, 0)
        wins = reduce(lambda t, g: t + 1 if g.placement == 'Victory' else t,
                      games, 0)

        count = games.count()
        if count == 0:
            kds.insert(0, 0)
        elif count - wins == 0:
            kds.insert(0, kills)
        else:
            kds.insert(0, kills / (count - wins))

        labels.insert(0, start_date.__format__('%b %-d'))

        start_date -= datetime.timedelta(days=1)
        end_date -= datetime.timedelta(days=1)

    return jsonify(dict(xAxis=labels, yAxis=kds))


#kd_progression
