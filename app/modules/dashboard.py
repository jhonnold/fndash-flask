from flask import Blueprint, render_template, redirect, url_for
from app.models import User, Game

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/')
def home():
    users = User.query.all()
    return redirect(url_for('dashboard.user_stats', user_id=users[0].id))


@dashboard.route('/users/<user_id>')
def user_stats(user_id):
    users = User.query.all()
    selected_user = None

    for user in users:
        if (user.id == int(user_id)):
            selected_user = user
            break

    selected_user_data = dict(**selected_user.__dict__)
    if '_sa_instance_state' in selected_user_data:
        del selected_user_data['_sa_instance_state']

    kd_total = selected_user.kills_total / (
        selected_user.matchesplayed_total - selected_user.wins_total)
    selected_user_data['kd_total'] = "{0:0.3f}".format(kd_total)

    kd_solo = selected_user.kills_solo / (
        selected_user.matchesplayed_solo - selected_user.placetop1_solo)
    selected_user_data['kd_solo'] = "{0:0.3f}".format(kd_solo)

    kd_duo = selected_user.kills_duo / (
        selected_user.matchesplayed_duo - selected_user.placetop1_duo)
    selected_user_data['kd_duo'] = "{0:0.3f}".format(kd_duo)

    kd_squad = selected_user.kills_squad / (
        selected_user.matchesplayed_squad - selected_user.placetop1_squad)
    selected_user_data['kd_squad'] = "{0:0.3f}".format(kd_squad)

    return render_template('layout.html', users=users, **selected_user_data)