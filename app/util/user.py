from app.models import User, Stat

IMPORTANT_MODES = [
    'default', 'showdownalt', 'showdown', 'showdowntournament'
]


def get_user(user_id):
    return User.query.filter_by(id=user_id).first()


def get_user_lifetime_stats(user):
    if user is None:
        return 0

    stats = user.stats.filter(Stat.name.in_(IMPORTANT_MODES)).all()

    kills, games, wins = 0, 0, 0
    for stat in stats:
        kills += stat.kills
        games += stat.matchesplayed

        placements = stat.placements if type(
            stat.placements) is not list else stat.placements[0]
        wins += placements.get('placetop1', 0)

    kd = kills / max(1, games - wins)

    return dict(kills=kills, matchesplayed=games, wins=wins, kd=kd)
