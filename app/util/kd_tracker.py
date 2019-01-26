from app.models import KD


def kd_progression(user):
    kds = user.kds.order_by(KD.id.desc()).limit(7)

    totals = []
    solos = []
    duos = []
    squads = []

    for i in range(7):
        try:
            kd = kds[i]
            totals.insert(0, kd.total)
            solos.insert(0, kd.solo)
            duos.insert(0, kd.duo)
            squads.insert(0, kd.squad)
        except:
            totals.insert(0, user.kd_total())
            solos.insert(0, user.kd_solo())
            duos.insert(0, user.kd_duo())
            squads.insert(0, user.kd_squad())

    return (totals, solos, duos, squads)
