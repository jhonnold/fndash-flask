import datetime

from sqlalchemy.dialects.postgresql import JSONB
from app.database import db

class StatHistory(db.Model):
    __tablename__ = 'stat_history'

    id = db.Column(db.Integer(), primary_key=True)
    stat_id = db.Column(db.Integer(), db.ForeignKey('stat.id'))
    placements = db.Column(JSONB)
    kills = db.Column(db.Integer(), default=0)
    matchesplayed = db.Column(db.Integer(), default=0)
    playersoutlived = db.Column(db.Integer(), default=0)
    minutesplayed = db.Column(db.Integer(), default=0)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.now)

    def __repr__(self):
        return "<StatHistory {}>".format(self.id)
