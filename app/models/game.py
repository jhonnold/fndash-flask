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

    def serialize(self, loaded = []):
        dict = {
            'id': self.id,
            'time_played': self.time_played,
            'kills': self.kills,
            'placement': self.placement
        }

        if 'stat' in loaded:
            dict['stat'] = self.stat.serialize(loaded)
        else:
            dict['stat_id'] = self.stat_id

        return dict
