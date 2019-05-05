import datetime

from app.database import db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(32), nullable=False, unique=True)
    username = db.Column(db.String(255))
    last_known_data_hash = db.Column(db.String())
    updated_at = db.Column(db.DateTime(), default=datetime.datetime.now)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    inputs = db.relationship('Input', backref='user', lazy='dynamic')

    def __repr__(self):
        return "<User '{}'>".format(self.username)

    def serialize(self):
        return {
            'id': self.id,
            'uid': self.uid,
            'username': self.username,
            'updated_at': self.updated_at,
            'created_at': self.created_at
        }
