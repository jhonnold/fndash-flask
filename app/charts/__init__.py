import datetime, re

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


def placements_per_mode(user, included_playlists, included_modes):
    labels, datasets = [], []

    for idx, mode in enumerate(included_modes):
        stats = user.stats.filter(
            Stat.name.in_(included_playlists)).filter(Stat.mode == mode).all()

        # No stats? Shove on empty data
        if len(stats) == 0:
            datasets.append([])
            labels.append([])
            continue

        datasets.append(dict())

        # Summate the placement dictionaries, add in placetop100 (Loss)
        for stat in stats:
            placements = stat.placements[0] if type(
                stat.placements) is list else stat.placements
            for place in placements.keys():
                if place not in datasets[idx]:
                    datasets[idx][place] = 0

                datasets[idx][place] += placements.get(place)

            if 'placetop100' not in datasets[idx]:
                datasets[idx]['placetop100'] = 0

            datasets[idx]['placetop100'] += stat.matchesplayed

        # Convert this to an array, and map dict to array in order
        possible_placements = []
        for key in datasets[idx].keys():
            possible_placements.append(int(re.findall(r'\d+', key)[0]))
        possible_placements.sort()
        datasets[idx] = [
            datasets[idx].get('placetop{}'.format(p))
            for p in possible_placements
        ]

        # Modify placement logic to correct values by going thru array backwards
        for j, e in reversed(list(enumerate(datasets[idx]))):
            if j == 0: break
            datasets[idx][j] -= datasets[idx][j - 1]

        labels.append(len(possible_placements) * [None])
        for j, place in enumerate(possible_placements):
            if place == 100:
                labels[idx][j] = '{} Loss'.format(mode.capitalize())
            elif place == 1:
                labels[idx][j] = '{} Victory'.format(mode.capitalize())
            else:
                labels[idx][j] = '{} Top {}'.format(mode.capitalize(), place)

    return labels, datasets


def minutes_played_per_playlist_mode(user, included_playlists, included_modes):
    labels, minutes = [], []

    for mode in included_modes:
        stat = user.stats.filter(Stat.name.in_(included_playlists)).filter(
            Stat.mode == mode).first()

        labels.append('{} Minutes'.format(mode.capitalize()))
        minutes.append(stat.minutesplayed if stat is not None else 0)

    return labels, minutes
