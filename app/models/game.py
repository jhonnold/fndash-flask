import datetime

from app.database import db


class Game(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    game_type = db.Column(db.String(6))
    time_played = db.Column(db.DateTime(), default=datetime.datetime.now)
    kills = db.Column(db.Integer())
    placement = db.Column(db.String())

    def __repr__(self):
        return "<Game '{}' - '{}'>".format(self.game_type, self.time_played)

    def serialize(self):
        return dict(kills=self.kills, placement=self.placement, time_played=self.time_played, game_type=self.game_type, id=self.id, user_id=self.user_id)