import datetime

from app.database import db


class UserProgressionData(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
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
    date = db.Column(db.Date(), default=datetime.date.today)

    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)

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
