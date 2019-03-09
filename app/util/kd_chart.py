from functools import reduce
from app.models import Game, KD
from .time import ONE_DAY, get_today_range


def kd_per_day(user, mode):
    start_date, end_date = get_today_range()

    labels = []
    daily_kds = []
    kd_progression = []

    kds = user.kds.order_by(KD.id.desc()).limit(6)
    kd_progression = [user.kd(mode)]

    for i in range(7):
        labels.insert(0, start_date.__format__('%b %-d'))

        #######################################
        # This is all logic for kd_progression#
        #######################################
        if i > 0:
            try:
                # Try to insert an existing KD from our DB,
                # if one doesn't exist catch that and just insert 0
                # ATM there is no date verification for kd progression,
                # that should be added
                kd = kds[i - 1]
                if mode == 'solo':
                    kd_progression.insert(0, kd.solo)
                elif mode == 'duo':
                    kd_progression.insert(0, kd.duo)
                elif mode == 'squad':
                    kd_progression.insert(0, kd.squad)
                else:
                    kd_progression.insert(0, kd.total)
            except:
                kd_progression.insert(0, 0)

        ##############################################
        # This is all logic for calculating daily_kds#
        ##############################################
        if mode != 'all':
            games = user.games.filter_by(mode=mode).filter(
                Game.time_played >= start_date).filter(
                    Game.time_played < end_date)
        else:
            games = user.games.filter(Game.time_played >= start_date).filter(
                Game.time_played < end_date)

        kills = reduce(lambda t, g: t + g.kills, games, 0)
        wins = reduce(lambda t, g: t + 1 if g.placement == 'Victory' else t,
                      games, 0)

        if games.count() == 0:
            kd = 0
        elif games.count() - wins == 0:
            kd = kills
        else:
            kd = kills / (games.count() - wins)

        daily_kds.insert(0, kd)

        start_date -= ONE_DAY
        end_date -= ONE_DAY

    return labels, [daily_kds, kd_progression]
