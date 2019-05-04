import datetime

from app.database import db


class Input(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    input_type = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    db.relationship('Stat', backref='input', lazy='dynamic')

    def __repr__(self):
        return "<Input '{}' - '{}'>".format(self.user_id, self.input_type)