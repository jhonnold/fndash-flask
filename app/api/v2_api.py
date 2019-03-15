import datetime, requests

from functools import wraps
from flask import Blueprint, jsonify, current_app, Response, abort, request
from app.models import User
from app.database import db
from app.charts import kd_per_day

v2_api = Blueprint('v2_api', __name__, url_prefix='/v2/api')


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


def tomorrow(timezone):
    std_now = datetime.datetime.now(tz=timezone)
    today_std = datetime.datetime(
        year=std_now.year,
        month=std_now.month,
        day=std_now.day,
        tzinfo=timezone)
    return today_std + datetime.timedelta(days=1)


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
    return jsonify(user.serialize(include_stats=True))

@v2_api.route('/users/<user_id>/games')
@prefetch_user
def user_games(user):
    pass

@v2_api.route('/users/<user_id>/records')
@prefetch_user
def user_records(user):
    pass


@v2_api.route('/users/<user_id>/kd')
@prefetch_user
def user_kd(user):
    playlist_csv = request.args.get('p', 'default,showdownalt,showdown')
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

    labels, kds = kd_per_day(user, included_playlists, included_modes, t_to,
                             t_from)

    return jsonify(dict(labels=labels, kds=kds))

@v2_api.route('/users/<user_id>/placements')
@prefetch_user
def user_placements(user):
    pass


@v2_api.route('/users/<user_id>/games_count')
@prefetch_user
def user_games_count(user):
    pass


@v2_api.route('/users/<user_id>/time_played')
@prefetch_user
def user_time_played(user):
    pass