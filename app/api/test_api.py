import unittest

from app import app
from app.database import db

class APITestCase(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        with app.app_context():
            db.drop_all()
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.drop_all()
            db.session.close()

    def test_foo_bar(self):
        rv = self.app.get('/api/')
        self.assertDictEqual(rv.json, dict(foo='bar'), 'FooBar should return foo=bar')

    def test_empty_users(self):
        rv = self.app.get('/api/users')
        self.assertListEqual(rv.json, [], 'Initial call to users was not empty!')