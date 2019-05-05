from flask import Response, request, current_app
from flask.json import jsonify
from sqlalchemy.orm import joinedload

from app.models import Stat, Input
from app.database import db
from . import api


@api.route('/stats')
def stats_index():
    query = Stat.query

    input_id = request.args.get('input_id')
    user_id = request.args.get('user_id')
    if input_id is not None:
        if not input_id.isdigit():
            return Response('Input ID must be a number', 400)
        query = query.filter(Stat.input_id == input_id)
    elif user_id is not None:
        if not user_id.isdigit():
            return Response('User ID must be a number', 400)
        query = query\
                    .join(Stat.input)\
                    .filter(Input.user_id == user_id)
    else:
        return Response('Either input_id or user_id are required', 400)

    stats = query\
                .order_by(Stat.id.asc())\
                .options(joinedload('input').joinedload('user'))\
                .all()

    return jsonify([s.serialize() for s in stats])


@api.route('/stats/<id>')
def stats_show(id):
    if not id.isdigit():
        return Response('ID must be a number', 400)

    stat = Stat.query\
                .options(joinedload('input').joinedload('user'))\
                .get(id)
    if stat is None:
        return Response('Stat not found!', 404)

    return jsonify(stat.serialize())
