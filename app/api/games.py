from datetime import date, timedelta
from dateutil import parser
from flask import Response, request
from flask.json import jsonify
from sqlalchemy.orm import joinedload

from app.models import Game, Stat, Input, User
from . import api


@api.route('/games/search', methods=['POST'])
def games_search():
    query = Game.query

    data = request.get_json()
    if data is None:
        return Response('Body cannot be None', 400)

    input_id = data.get('inputId')
    user_id = data.get('userId')
    username = data.get('username')
    input_type = data.get('inputType')
    time = data.get('time')
    playlists = data.get('playlists')
    modes = data.get('modes')
    order_by = data.get('orderBy')
    limit = data.get('limit')

    if input_id is None:
        if input_type is None:
            return Response(
                'Not enough information provided! You must send either a direct inputId, or inputType with username or userId.',
                400)

        _input = None
        if user_id is not None:
            _input = Input.query\
                              .filter(Input.user_id == user_id)\
                              .filter(Input.input_type == input_type)\
                              .first()

        elif username is not None:
            user = User.query.filter(User.username == username).first()

            if user is None:
                return Response('A user by this username is not being tracked by us! Get them signed up!', 404)

            _input = Input.query\
                              .filter(Input.user_id == user.id)\
                              .filter(Input.input_type == input_type)\
                              .first()
        else:
            return Response(
                'Not enough information provided! You must send either a direct inputId, or inputType with username or userId.',
                400)

        if _input is None:
            return Response('This user doesn\'t play with this type of input!', 400)

        input_id = _input.id

    query = query.join(Stat)\
                    .filter(Stat.input_id == input_id)

    if playlists is not None:
        query = query.filter(Stat.name.in_(playlists))
    else:
        query = query.filter(Stat.name.in_(['default', 'showdown', 'showdownalt', 'showdowntournament']))

    if modes is not None:
        query = query.filter(Stat.mode.in_(modes))
    else:
        query = query.filter(Stat.mode.in_(['solo', 'duo', 'squad']))

    if time is not None:
        t_start_str = time.get('start')
        t_end_str = time.get('end')

        if t_end_str is None or t_start_str is None:
            return Response('When specifying time, both start and end must be given', 400)

        if t_start_str is not None:
            try:
                t_start = parser.parse(t_start_str)
                query = query.filter(Game.time_played >= t_start)
            except ValueError:
                return Response('Start date is not invalid format')

        if t_end_str is not None:
            try:
                t_end = parser.parse(t_end_str)
                query = query.filter(Game.time_played <= t_end)
            except ValueError:
                return Response('End date is not invalid format')

    else:
        one_week_ago = date.today() - timedelta(days=7)
        query = query.filter(Game.time_played >= one_week_ago)

    if order_by is not None:
        if order_by != 'kills' and order_by != 'time':
            return Response('Invalid ordering, must be either kills or time', 400)

        if order_by == 'kills':
            query = query.order_by(Game.kills.desc())
        else:
            query = query.order_by(Game.time_played.desc())

    if limit is not None:
        if not limit.isdigit():
            return Response('Limit must be a number!', 400)
        query = query.limit(limit)

    games = query.options(joinedload('stat').joinedload('input')).all()

    return jsonify([g.serialize(['game', 'stat']) for g in games])
