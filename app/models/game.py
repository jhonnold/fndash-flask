import datetime

from app.database import db


class Game(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    time_played = db.Column(db.DateTime(), default=datetime.datetime.now)
    kills = db.Column(db.Integer())
    placement = db.Column(db.String())
    playlist = db.Column(db.String())
    mode = db.Column(db.String())

    def __repr__(self):
        return "<Game '{}/{}' - '{}'>".format(self.playlist, self.mode, self.time_played)

    def serialize(self):
        return dict(
            kills=self.kills,
            placement=self.placement,
            time_played=self.time_played,
            mode=self.mode,
            playlist=self.playlist,
            id=self.id,
            user_id=self.user_id)
