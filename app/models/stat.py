import datetime

from sqlalchemy.dialects.postgresql import JSONB
from app.database import db


def get_placements(stat):
    placements = dict()

    for key in stat.keys():
        if ('placetop' in key):
            placements[key] = stat.get(key)

    return placements


class Stat(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    input_id = db.Column(db.Integer(), db.ForeignKey('input.id'))
    name = db.Column(db.String())
    mode = db.Column(db.String())
    is_ltm = db.Column(db.Boolean(), nullable=False)
    placements = db.Column(JSONB)
    kills = db.Column(db.Integer(), default=0)
    matchesplayed = db.Column(db.Integer(), default=0)
    playersoutlived = db.Column(db.Integer(), default=0)
    minutesplayed = db.Column(db.Integer(), default=0)
    updated_at = db.Column(db.DateTime(), default=datetime.datetime.now)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    __table_args__ = (
        db.UniqueConstraint('input_id', 'name', 'mode', name='_input_name_mode_uc'),
        db.Index('_name_mode_ix', 'name', 'mode'),
    )

    histories = db.relationship('StatHistory', backref='current_stat', lazy='dynamic')
    games = db.relationship('Game', backref='stat', lazy='dynamic')

    def __repr__(self):
        return "<Stat '{}' - '{}'>".format(self.name, self.mode)

    def serialize(self, loaded=[]):
        dict = {
            'id': self.id,
            'name': self.name,
            'mode': self.mode,
            'is_ltm': self.is_ltm,
            'placements': self.placements,
            'kills': self.kills,
            'matchesplayed': self.matchesplayed,
            'playersoutslived': self.playersoutlived,
            'minutesplayed': self.minutesplayed,
            'updated_at': self.updated_at,
            'created_at': self.created_at
        }

        if 'input' in loaded:
            dict['input'] = self.input.serialize(loaded)
        else:
            dict['input_id'] = self.input_id

        return dict
