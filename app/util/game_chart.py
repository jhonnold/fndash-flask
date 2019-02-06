from app.models import Game
from .time import ONE_DAY, get_today_range


def games_per_day(user, mode='all'):
    start_date, end_date = get_today_range()

    labels = []
    counts = []

    for i in range(7):
        labels.insert(0, start_date.__format__('%b %-d'))

        if mode != 'all':
            games = user.games.filter_by(game_type=mode.capitalize()).filter(
                Game.time_played >= start_date).filter(
                    Game.time_played < end_date)
        else:
            games = user.games.filter(Game.time_played >= start_date).filter(
                Game.time_played < end_date)

        counts.insert(0, games.count())

        start_date -= ONE_DAY
        end_date -= ONE_DAY

    return labels, [counts]