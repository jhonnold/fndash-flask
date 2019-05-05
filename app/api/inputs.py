from flask import Response, request
from flask.json import jsonify
from sqlalchemy.orm import joinedload

from app.models import Input
from app.database import db
from . import api


@api.route('/inputs')
def inputs_index():
    query = Input.query

    user_id = request.args.get('user_id')
    if user_id is not None:
        if not user_id.isdigit():
            return Response('User ID must be a number', 400)
        query = query.filter(Input.user_id == user_id)

    inputs = query\
                .order_by(Input.id.asc())\
                .options(joinedload('user'))\
                .all()

    return jsonify([i.serialize() for i in inputs])


@api.route('/inputs/<id>')
def inputs_show(id):
    if not id.isdigit():
        return Response('ID must be a number', 400)

    _input = Input.query.options(joinedload('user')).get(id)
    if _input is None:
        return Response('Input not found!', 404)

    return jsonify(_input.serialize())
