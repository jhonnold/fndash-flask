from app.database import db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(32), nullable=False, unique=True)
    username = db.Column(db.String(255))
    kills_total = db.Column(db.Integer(), default=0)
    wins_total = db.Column(db.Integer(), default=0)
    matchesplayed_total = db.Column(db.Integer(), default=0)
    hoursplayed_total = db.Column(db.Integer(), default=0)
    lastmodified_total = db.Column(db.Integer(), default=0)
    kills_solo = db.Column(db.Integer(), default=0)
    placetop1_solo = db.Column(db.Integer(), default=0)
    placetop10_solo = db.Column(db.Integer(), default=0)
    placetop25_solo = db.Column(db.Integer(), default=0)
    matchesplayed_solo = db.Column(db.Integer(), default=0)
    minutesplayed_solo = db.Column(db.Integer(), default=0)
    lastmodified_solo = db.Column(db.Integer(), default=0)
    kills_duo = db.Column(db.Integer(), default=0)
    placetop1_duo = db.Column(db.Integer(), default=0)
    placetop5_duo = db.Column(db.Integer(), default=0)
    placetop12_duo = db.Column(db.Integer(), default=0)
    matchesplayed_duo = db.Column(db.Integer(), default=0)
    minutesplayed_duo = db.Column(db.Integer(), default=0)
    lastmodified_duo = db.Column(db.Integer(), default=0)
    kills_squad = db.Column(db.Integer(), default=0)
    placetop1_squad = db.Column(db.Integer(), default=0)
    placetop3_squad = db.Column(db.Integer(), default=0)
    placetop6_squad = db.Column(db.Integer(), default=0)
    matchesplayed_squad = db.Column(db.Integer(), default=0)
    minutesplayed_squad = db.Column(db.Integer(), default=0)
    lastmodified_squad = db.Column(db.Integer(), default=0)

    games = db.relationship('Game', backref='user', lazy='dynamic')

    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)