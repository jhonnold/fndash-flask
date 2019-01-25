import datetime

from app.database import db


class KD(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    total = db.Column(db.Float(), default=0)
    solo = db.Column(db.Float(), default=0)
    duo = db.Column(db.Float(), default=0)
    squad = db.Column(db.Float(), default=0)
    date = db.Column(db.Date(), default=datetime.date.today())