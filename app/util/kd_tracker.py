from app.models import KD


def kd_progression(user):
    kds = user.kds.order_by(KD.id.desc()).limit(6)

    totals = [user.kd_total()]
    solos = [user.kd_solo()]
    duos = [user.kd_duo()]
    squads = [user.kd_squad()]

    for i in range(6):
        try:
            kd = kds[i]
            totals.insert(0, kd.total)
            solos.insert(0, kd.solo)
            duos.insert(0, kd.duo)
            squads.insert(0, kd.squad)
        except:
            totals.insert(0, 0)
            solos.insert(0, 0)
            duos.insert(0, 0)
            squads.insert(0, 0)

    return (totals, solos, duos, squads)
