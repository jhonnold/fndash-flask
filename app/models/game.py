import datetime

from app.database import db


class Game(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    game_type = db.Column(db.String(6))
    time_played = db.Column(db.Integer(), default=datetime.datetime.now)
    kills = db.Column(db.Integer())
    placement = db.Column(db.String())

    def __repr__(self):
        return "<Game '{}' - '{}'>".format(self.game_type, self.time_played)