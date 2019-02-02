import datetime

from app.models import Game


def kd_per_day(user, mode='All', adjust=0):
    current_time_adjust = datetime.datetime.today() + datetime.timedelta(
        hours=adjust)
    start_date = datetime.datetime(
        year=current_time_adjust.year,
        month=current_time_adjust.month,
        day=current_time_adjust.day) - datetime.timedelta(hours=adjust)
    end_date = start_date + datetime.timedelta(days=1)

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
        wins = 0
        for game in games:
            kills += game.kills
            if game.placement == 'Victory':
                wins += 1

        count = games.count()
        if count == 0:
            kds.insert(0, 0)
        elif count - wins == 0:
            kds.insert(0, kills)
        else:
            kds.insert(0, kills / (count - wins))

        labels.insert(0, start_date.__format__('%b %-d'))

        start_date -= datetime.timedelta(days=1)
        end_date -= datetime.timedelta(days=1)

    return labels, kds
