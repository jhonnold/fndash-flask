def total_kd(user):
    return user.kills_total / (user.matchesplayed_total - user.wins_total)


def solo_kd(user):
    return user.kills_solo / (user.matchesplayed_solo - user.placetop1_solo)


def duo_kd(user):
    return user.kills_duo / (user.matchesplayed_duo - user.placetop1_duo)


def squad_kd(user):
    return user.kills_squad / (user.matchesplayed_squad - user.placetop1_squad)