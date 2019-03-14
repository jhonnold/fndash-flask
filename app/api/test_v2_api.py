import unittest, uuid

from app import app
from app.database import db
from app.models import User
from app.api.v2_api import prefetch_user
from werkzeug.exceptions import HTTPException


class V2_API_TestCase(unittest.TestCase):
    def setUp(self):
        app.test = True
        self.app = app.test_client()
        with app.app_context():
            db.drop_all()
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.drop_all()
            db.session.close()

    #################
    # prefetch_user #
    #################
    def test_throws_not_found(self):
        def f(user_id):
            pass

        with app.app_context():
            with self.assertRaises(HTTPException):
                prefetch_user(f)(1)

    #################
    # /v2/api/users #
    #################
    def test_empty_users(self):
        rv = self.app.get('/v2/api/users')
        self.assertListEqual(rv.json, [])

    def test_all_users(self):
        with app.app_context():
            for _ in range(0, 20):
                user = User(uid=uuid.uuid4().hex)
                db.session.add(user)
            db.session.commit()

            rv = self.app.get('/v2/api/users')
            self.assertEqual(len(rv.json), 20)

    def test_users_count(self):
        with app.app_context():
            for _ in range(0, 20):
                user = User(uid=uuid.uuid4().hex)
                db.session.add(user)
            db.session.commit()

            rv = self.app.get('/v2/api/users?c=3')
            self.assertEqual(len(rv.json), 3)
            self.assertEqual(rv.json[0].get('id'), 1)
            self.assertEqual(rv.json[1].get('id'), 2)
            self.assertEqual(rv.json[2].get('id'), 3)

    def test_users_pagination(self):
        with app.app_context():
            for _ in range(0, 20):
                user = User(uid=uuid.uuid4().hex)
                db.session.add(user)
            db.session.commit()

            rv = self.app.get('/v2/api/users?c=3&p=3')
            self.assertEqual(len(rv.json), 3)
            self.assertEqual(rv.json[0].get('id'), 7)
            self.assertEqual(rv.json[1].get('id'), 8)
            self.assertEqual(rv.json[2].get('id'), 9)

    ###########################
    # /v2/api/users/<user_id> #
    ###########################
    def test_get_user(self):
        with app.app_context():
            uid = uuid.uuid4().hex
            user = User(uid=uid)
            db.session.add(user)
            db.session.commit()

            rv = self.app.get('/v2/api/users/{}'.format(user.id))
            self.assertTrue('id' in rv.json)
            self.assertTrue('stats' in rv.json)
            self.assertTrue('uid' in rv.json)
            self.assertEqual(rv.json.get('id'), user.id)
            self.assertEqual(rv.json.get('uid'), uid)

