import datetime

from app.database import db


class Game(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    stat_id = db.Column(db.Integer(), db.ForeignKey('stat.id'))
    time_played = db.Column(db.DateTime(), default=datetime.datetime.now)
    kills = db.Column(db.Integer())
    placement = db.Column(db.String())

    def __repr__(self):
        return "<Game '{}/{}' - '{}'>".format(self.playlist, self.mode, self.time_played)
