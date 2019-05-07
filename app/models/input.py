import datetime

from app.database import db


class Input(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    input_type = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    stats = db.relationship('Stat', backref='input', lazy='dynamic')

    def __repr__(self):
        return "<Input '{}' - '{}'>".format(self.user_id, self.input_type)

    def serialize(self, loaded = []):
        dict = {
            'id': self.id,
            'input_type': self.input_type,
        }

        if 'user' in loaded:
            dict['user'] = self.user.serialize()
        else:
            dict['user_id'] = self.user_id

        return dict