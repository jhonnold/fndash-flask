import os, requests

from flask import Response, request

from .app import create_app
from .celery import create_celery
from .database import db
from .api import create_api_manager
from .models import User

app = create_app()

db.init_app(app)
api_manager = create_api_manager(app)
celery = create_celery(app)

@app.route('/api/users', methods=['POST'])
def users_create():
    data = request.get_json()

    username = data.get('username')
    if username is None:
        return Response('Username Required', 400)

    url = 'https://fortnite-public-api.theapinetwork.com/users/id?username={}'
    res = requests.get(url.format(username), headers={'Authorization': os.getenv('FORTNITE_API_AUTH')}).json()
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
