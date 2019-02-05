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
    kds = db.relationship('KD', backref='user', lazy='dynamic')

    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)

    def serialize(self):
        user_data = dict()
        user_data['all'] = dict(
            wins=self.wins_total,
            matches=self.matchesplayed_total,
            kills=self.kills_total,
            kd=self.kd_total(),
        )

        user_data['solo'] = dict(
            wins=self.placetop1_solo,
            matches=self.matchesplayed_solo,
            kills=self.kills_solo,
            kd=self.kd_solo(),
        )

        user_data['duo'] = dict(
            wins=self.placetop1_duo,
            matches=self.matchesplayed_duo,
            kills=self.kills_duo,
            kd=self.kd_duo(),
        )

        user_data['squad'] = dict(
            wins=self.placetop1_squad,
            matches=self.matchesplayed_squad,
            kills=self.kills_squad,
            kd=self.kd_squad(),
        )

        user_data['id'] = self.id
        user_data['username'] = self.username
        user_data['uid'] = self.uid
        
        return user_data

    def kd_total(self):
        return self.kills_total / (self.matchesplayed_total - self.wins_total)

    def kd_solo(self):
        return self.kills_solo / (
            self.matchesplayed_solo - self.placetop1_solo)

    def kd_duo(self):
        return self.kills_duo / (self.matchesplayed_duo - self.placetop1_duo)

    def kd_squad(self):
        return self.kills_squad / (
            self.matchesplayed_squad - self.placetop1_squad)

    def placements_solo(self):
        losses_solo = self.matchesplayed_solo - (
            self.placetop1_solo + self.placetop10_solo + self.placetop25_solo)

        return [
            self.placetop1_solo, self.placetop10_solo, self.placetop25_solo,
            losses_solo
        ]

    def placements_duo(self):
        losses_duo = self.matchesplayed_duo - (
            self.placetop1_duo + self.placetop5_duo + self.placetop12_duo)

        return [
            self.placetop1_duo, self.placetop5_duo, self.placetop12_duo,
            losses_duo
        ]

    def placements_squad(self):
        losses_squad = self.matchesplayed_squad - (
            self.placetop1_squad + self.placetop3_squad + self.placetop6_squad)

        return [
            self.placetop1_squad, self.placetop3_squad, self.placetop6_squad,
            losses_squad
        ]
