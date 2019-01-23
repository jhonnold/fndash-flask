from datetime import date, timedelta
from app.models import Game


def kd_per_day(user, mode='All'):
    start_date = date.today()
    end_date = start_date + timedelta(days=1)

    labels = []
    kds = []

    for i in range(7):
        games = []
        if mode == 'All':
            games = user.games.filter(Game.time_played >= start_date).filter(
                Game.time_played < end_date)
        else:
            games = user.games.filter_by(game_type=mode).filter(
                Game.time_played >= start_date).filter(
                    Game.time_played < end_date)

        kills = 0
        for game in games:
            kills += game.kills

        count = games.count()
        if count > 0:
            kds.insert(0, kills / games.count())
        else:
            if mode == 'Solo':
                kds.insert(0, user.kd_solo())
            elif mode == 'Duo':
                kds.insert(0, user.kd_duo())
            elif mode == 'Squad':
                kds.insert(0, user.kd_squad())
            else:
                kds.insert(0, user.kd_total())

        labels.insert(0, str(start_date))

        start_date -= timedelta(days=1)
        end_date -= timedelta(days=1)

    return labels, kds
