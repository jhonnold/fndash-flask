import datetime

from app.models import Game


def games_per_day(user, mode='All', adjust=0):
    today = datetime.date.today()
    start_date = datetime.datetime(
        year=today.year, month=today.month,
        day=today.day) - datetime.timedelta(hours=adjust)
    end_date = start_date + datetime.timedelta(days=1)

    labels = []
    counts = []

    for i in range(7):
        games = []
        if mode == 'All':
            games = user.games.filter(Game.time_played >= start_date).filter(
                Game.time_played < end_date)
        else:
            games = user.games.filter_by(game_type=mode).filter(
                Game.time_played >= start_date).filter(
                    Game.time_played < end_date)

        labels.insert(0, start_date.__format__('%b %-d'))
        counts.insert(0, games.count())

        start_date -= datetime.timedelta(days=1)
        end_date -= datetime.timedelta(days=1)

    return labels, counts