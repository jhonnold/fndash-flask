def placements_solo(user):
    losses_solo = user.matchesplayed_solo - (
        user.placetop1_solo + user.placetop10_solo + user.placetop25_solo)

    return [
        user.placetop1_solo, user.placetop10_solo, user.placetop25_solo,
        losses_solo
    ]


def placements_duo(user):
    losses_duo = user.matchesplayed_duo - (
        user.placetop1_duo + user.placetop5_duo + user.placetop12_duo)

    return [
        user.placetop1_duo, user.placetop5_duo, user.placetop12_duo, losses_duo
    ]


def placements_squad(user):
    losses_squad = user.matchesplayed_squad - (
        user.placetop1_squad + user.placetop3_squad + user.placetop6_squad)

    return [
        user.placetop1_squad, user.placetop3_squad, user.placetop6_squad,
        losses_squad
    ]
