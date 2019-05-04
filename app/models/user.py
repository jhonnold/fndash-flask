import datetime

from app.database import db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(32), nullable=False, unique=True)
    username = db.Column(db.String(255))
    last_known_data_hash = db.Column(db.BigInteger())
    updated_at = db.Column(db.DateTime(), default=datetime.datetime.now)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    inputs = db.relationship('Input', backref='user', lazy='dynamic')

    def __repr__(self):
        return "<User '{}'>".format(self.username)

    def serialize(self, include_stats=False):
        user_data = dict(**self.__dict__)
        del user_data['_sa_instance_state']

        return user_data
