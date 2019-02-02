import datetime

from app.models import Game


def todays_games(user):
    current_time_adjust = datetime.datetime.today() + datetime.timedelta(
        hours=-5)
    start_date = datetime.datetime(
        year=current_time_adjust.year,
        month=current_time_adjust.month,
        day=current_time_adjust.day) - datetime.timedelta(hours=-5)
    end_date = start_date + datetime.timedelta(days=1)

    return user.games.filter(Game.time_played >= start_date).filter(
        Game.time_played < end_date)


def todays_kills(user):
    games = todays_games(user)

    kills = 0
    for game in games:
        kills += game.kills

    return kills


def todays_wins(user):
    games = todays_games(user)

    wins = 0
    for game in games:
        if game.placement == 'Victory':
            wins += 1

    return wins


def todays_kd(user):
    games = todays_games(user)
    kills = todays_kills(user)
    wins = todays_wins(user)

    count = games.count()
    if count > 0:
        return kills / (count - wins)
    else:
        return 0


def todays_matches(user):
    return todays_games(user).count()