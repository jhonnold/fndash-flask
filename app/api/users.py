import requests

from flask import Response, request
from flask.json import jsonify

from app.models import User
from app.database import db
from . import api


@api.route('/users')
def index():
    users = User.query.order_by(User.username.asc()).all()
    return jsonify([u.serialize() for u in users])


@api.route('/users/<id>')
def show(id):
    user = User.query.get(id)
    if user is None:
        return Response('User not found!', 404)
    return jsonify(user.serialize())


@api.route('/users', methods=['POST'])
def create():
    data = request.get_json()
    username = data.get('username')
    if username is None:
        return Response('Username Required', 400)

    url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/id?username={}'
    res = requests.get(url.format(username)).json()
    if 'error' in res:
        return Response('Username invalid or unable to locate your data', 400)

    uid = res.get('uid')
    user = User.query.filter_by(uid=uid).first()
    if user is not None:
        return Response('This player has already registered on FN Dash', 400)

    user = User(uid=uid, username=username)
    db.session.add(user)
    db.session.commit()

    return Response(status=201)
