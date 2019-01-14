from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    uid = db.Column(db.String(32), nullable=False, unique=True)
    username = db.Column(db.String(255))
    kills_total = db.Column(db.Integer())
    wins_total = db.Column(db.Integer())
    matchesplayed_total = db.Column(db.Integer())
    hoursplayed_total = db.Column(db.Integer())
    kills_solo = db.Column(db.Integer())
    placetop1_solo = db.Column(db.Integer())
    placetop10_solo = db.Column(db.Integer())
    placetop25_solo = db.Column(db.Integer())
    matchesplayed_solo = db.Column(db.Integer())
    kills_duo = db.Column(db.Integer())
    placetop1_duo = db.Column(db.Integer())
    placetop10_duo = db.Column(db.Integer())
    placetop25_duo = db.Column(db.Integer())
    matchesplayed_duo = db.Column(db.Integer())
    kills_squad = db.Column(db.Integer())
    placetop1_squad = db.Column(db.Integer())
    placetop3_squad = db.Column(db.Integer())
    placetop6_squad = db.Column(db.Integer())
    matchesplayed_squad = db.Column(db.Integer())
    timestamp = db.Column(db.Integer())


    def __init__(self, uid, username):
        self.uid = uid
        self.username = username

    def __repr__(self):
        return "<User '{}'>".format(self.username)



@app.route('/')
def home():
    users = User.query.all()
    return render_template('layout.html', users=users)
