import datetime

from app.models import Game, Stat

one_day = datetime.timedelta(days=1)


def kd_per_day(user, included_playlists, included_modes, t_to, t_from):
    upper_date = t_to
    lower_date = upper_date - one_day

    labels, kds = [], []

    while (upper_date > t_from):
        games = user.games.filter(Game.time_played >= lower_date).filter(
            Game.time_played < upper_date).filter(
                Game.playlist.in_(included_playlists)).filter(
                    Game.mode.in_(included_modes)).all()

        kills, wins = 0, 0
        for game in games:
            kills += game.kills
            if game.placement == 'Victory':
                wins += 1

        labels.insert(0, lower_date.__format__('%b %-d'))
        kds.insert(0, kills / max(1, len(games) - wins))

        upper_date, lower_date = lower_date, lower_date - one_day

    return labels, kds


def games_played_per_day(user, included_playlists, included_modes, t_to,
                         t_from):
    upper_date = t_to
    lower_date = upper_date - one_day

    labels, play_count = [], []

    while (upper_date > t_from):
        games = user.games.filter(Game.time_played >= lower_date).filter(
            Game.time_played < upper_date).filter(
                Game.playlist.in_(included_playlists)).filter(
                    Game.mode.in_(included_modes))

        labels.insert(0, lower_date.__format__('%b %-d'))
        play_count.insert(0, games.count())

        upper_date, lower_date = lower_date, lower_date - one_day

    return labels, play_count


def minutes_played_per_playlist_mode(user, included_playlists, included_modes):
    labels, minutes = [], []

    for mode in included_modes:
        stat = user.stats.filter(Stat.name.in_(included_playlists)).filter(
            Stat.mode == mode).first()

        labels.append('{} Minutes'.format(mode.capitalize()))
        minutes.append(stat.minutesplayed if stat is not None else 0)

    return labels, minutes
