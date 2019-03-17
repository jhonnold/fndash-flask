import datetime, requests

from functools import wraps
from flask import Blueprint, jsonify, current_app, Response, abort, request
from app.models import User, Game, Stat
from app.database import db
from app.charts import kd_per_day, games_played_per_day, minutes_played_per_playlist_mode, placements_per_mode, lifetime_kd_progression

v2_api = Blueprint('v2_api', __name__, url_prefix='/v2/api')

IMPORTANT_MODES = ['default', 'showdownalt', 'showdown', 'showdowntournament', 'blitz']


def tomorrow(timezone):
    std_now = datetime.datetime.now(tz=timezone)
    today_std = datetime.datetime(
        year=std_now.year,
        month=std_now.month,
        day=std_now.day,
        tzinfo=timezone)
    return today_std + datetime.timedelta(days=1)


def prefetch_user(f):
    @wraps(f)
    def wrapper(user_id):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            return abort(
                Response(
                    response='Unable to find user with id: {}'.format(user_id),
                    status=404))

        return f(user=user)

    return wrapper


class Params:
    def __init__(self, included_playlists, included_modes, t_to, t_from,
                 timezone):
        self.included_playlists = included_playlists
        self.included_modes = included_modes
        self.t_to = t_to
        self.t_from = t_from
        self.timezone = timezone


def append_params(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        playlist_csv = request.args.get(
            'p', 'default,showdownalt,showdown,showdowntournament,blitz')
        included_playlists = playlist_csv.split(',')

        mode_csv = request.args.get('m', 'solo,duo,squad')
        included_modes = mode_csv.split(',')

        t_to = request.args.get('to')
        t_from = request.args.get('from')
        tz_offset = int(request.args.get('tz', '0'))
        timezone = datetime.timezone(datetime.timedelta(hours=tz_offset))

        if t_to is not None:
            t_date = datetime.datetime.strptime(t_to, '%Y-%m-%d')
            t_to = datetime.datetime(
                year=t_date.year,
                month=t_date.month,
                day=t_date.month,
                tzinfo=timezone) + datetime.timedelta(days=1)
        else:
            t_to = tomorrow(timezone)

        if t_from is not None:
            t_date = datetime.datetime.strptime(t_from, '%Y-%m-%d')
            t_from = datetime.datetime(
                year=t_date.year,
                month=t_date.month,
                day=t_date.month,
                tzinfo=timezone) + datetime.timedelta(days=1)
        else:
            t_from = t_to - datetime.timedelta(days=7)

        params = Params(included_playlists, included_modes, t_to, t_from,
                        timezone)

        return f(params=params, *args, **kwargs)

    return wrapper


@v2_api.route('/users')
def users():
    page = request.args.get('p', '1')
    count = request.args.get('c', '20')

    if not page.isdigit() or not count.isdigit():
        return abort(Response(status=400))
    page, count = int(page), int(count)

    users = User.query.order_by(User.id.asc()).limit(count).offset(
        (page - 1) * count).all()
    users = [dict(id=u.id, username=u.username) for u in users]
    return jsonify(users)


@v2_api.route('/users/<user_id>')
@prefetch_user
def user(user):
    current_app.logger.debug('Fetched user: {}'.format(user))
    user_dict = user.serialize(include_stats=True)

    compiled_stats = dict(
        all=dict(placements=dict(placetop1=0), matchesplayed=0, kills=0))

    for m in ['solo', 'duo', 'squad']:
        stats = user.stats.filter(
            Stat.name.in_(IMPORTANT_MODES)).filter(Stat.mode == m).all()
        compiled_stats[m] = dict(
            placements=dict(placetop1=0), matchesplayed=0, kills=0)

        for stat in stats:
            placements = stat.placements if type(
                stat.placements) is not list else stat.placements[0]
            compiled_stats[m]['placements']['placetop1'] += placements.get(
                'placetop1', 0)
            compiled_stats[m]['matchesplayed'] += stat.matchesplayed
            compiled_stats[m]['kills'] += stat.kills

            compiled_stats['all']['placements']['placetop1'] += placements.get(
                'placetop1', 0)
            compiled_stats['all']['matchesplayed'] += stat.matchesplayed
            compiled_stats['all']['kills'] += stat.kills

        compiled_stats[m]['kd'] = compiled_stats[m]['kills'] / max(
            1, compiled_stats[m]['matchesplayed'] -
            compiled_stats[m]['placements']['placetop1'])

        compiled_stats['all']['kd'] = compiled_stats['all']['kills'] / max(
            1, compiled_stats['all']['matchesplayed'] -
            compiled_stats['all']['placements']['placetop1'])

    user_dict['compiled_stats'] = compiled_stats

    return jsonify(user_dict)


@v2_api.route('/users/<user_id>/games')
@prefetch_user
@append_params
def user_games(user, params):
    games = user.games.filter(Game.time_played >= params.t_from).filter(
        Game.time_played < params.t_to).filter(
            Game.playlist.in_(params.included_playlists)).filter(
                Game.mode.in_(params.included_modes)).order_by(
                    Game.time_played.desc()).all()

    return jsonify([g.serialize() for g in games])


@v2_api.route('/users/<user_id>/records')
@prefetch_user
@append_params
def user_records(user, params):
    record_games = []
    for mode in params.included_modes:
        game = user.games.filter(Game.playlist.in_(
            params.included_playlists)).filter(Game.mode == mode).filter(
                Game.kills > 0).order_by(Game.kills.desc()).first()

        if game is not None:
            record_games.append(game)

    return jsonify([g.serialize() for g in record_games])


@v2_api.route('/users/<user_id>/kd')
@prefetch_user
@append_params
def user_kd(user, params):
    labels, kds = kd_per_day(user, params.included_playlists,
                             params.included_modes, params.t_to, params.t_from)

    return jsonify(dict(labels=labels, datasets=[kds]))


@v2_api.route('/users/<user_id>/kd_progression')
@prefetch_user
@append_params
def user_kd_progression(user, params):
    labels, kds = lifetime_kd_progression(user, params.included_playlists,
                                          params.included_modes, params.t_to,
                                          params.t_from)

    return jsonify(dict(labels=labels, datasets=[kds]))


@v2_api.route('/users/<user_id>/placements')
@prefetch_user
@append_params
def user_placements(user, params):
    labels, placements = placements_per_mode(user, params.included_playlists,
                                             params.included_modes)

    return jsonify(dict(labels=labels, datasets=placements))


@v2_api.route('/users/<user_id>/games_count')
@prefetch_user
@append_params
def user_games_count(user, params):
    labels, play_count = games_played_per_day(user, params.included_playlists,
                                              params.included_modes,
                                              params.t_to, params.t_from)

    return jsonify(dict(labels=labels, datasets=[play_count]))


@v2_api.route('/users/<user_id>/time_played')
@prefetch_user
@append_params
def user_time_played(user, params):
    labels, minutes = minutes_played_per_playlist_mode(
        user, params.included_playlists, params.included_modes)

    return jsonify(dict(labels=labels, datasets=[minutes]))
