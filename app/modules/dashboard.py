from flask import Blueprint, render_template, redirect, url_for
from app.models import User, Game
from app.util import total_kd, solo_kd, duo_kd, squad_kd, placements_solo, placements_duo, placements_squad

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
    
    games = selected_user.games.limit(10).all()

    selected_user_data = dict(**selected_user.__dict__)
    if '_sa_instance_state' in selected_user_data:
        del selected_user_data['_sa_instance_state']

    selected_user_data['kd_total'] = "{0:0.3f}".format(total_kd(selected_user))
    selected_user_data['kd_solo'] = "{0:0.3f}".format(solo_kd(selected_user))
    selected_user_data['kd_duo'] = "{0:0.3f}".format(duo_kd(selected_user))
    selected_user_data['kd_squad'] = "{0:0.3f}".format(squad_kd(selected_user))

    selected_user_data['placements_solo'] = placements_solo(selected_user)
    selected_user_data['placements_duo'] = placements_duo(selected_user)
    selected_user_data['placements_squad'] = placements_squad(selected_user)

    return render_template('layout.html', users=users, **selected_user_data, games=games)
