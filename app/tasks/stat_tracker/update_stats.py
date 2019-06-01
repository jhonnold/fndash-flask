import celery, datetime, re

from app import db
from app.tasks import AppContextBase
from app.models import Input, Stat, Game
from app.models.stat import get_placements
from app.util import metrics
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@celery.task(base=AppContextBase, name="update_stats")
def update_stats(args):
    data_hash, changed_stats = args
    for input_id, mode, playlist, data in changed_stats:
        _input = Input.query.filter_by(id=input_id).first()
        stat = _input.stats.filter_by(mode=mode, name=playlist).first()

        just_created = False
        if stat is None:
            logger.info('No Stat {}--{} for user {} with {} \n Creating...'.format(playlist, mode, _input.user, _input))
            stat = Stat(
                input_id=input_id,
                name=playlist,
                mode=mode,
                matchesplayed=0,
                kills=0,
                placements=dict(),
                is_ltm=(playlist != 'default'))
            just_created = True
            db.session.add(stat)

        if stat.matchesplayed < data.get('matchesplayed', 0) and not just_created:
            game = create_game(stat, data)
            if game is not None:
                db.session.add(game)

            stat.placements = get_placements(data)
            stat.kills = data.get('kills', 0)
            stat.matchesplayed = data.get('matchesplayed', 0)
            stat.playersoutlived = data.get('playersoutlived', 0)
            stat.minutesplayed = data.get('minutesplayed', 0)
            stat.updated_at = datetime.datetime.now()

    db.session.commit()
    return data_hash


def create_game(stat, data):
    logger.info('Creating game for {} with {} in {}'.format(stat.input.user, stat.input, stat))
    metrics.inc('games')

    stat_placements = stat.placements
    if type(stat_placements) is list:
        stat_placements = stat_placements[0]

    placements = get_placements(data)
    placement = 'Loss'
    place = 101

    # Go thru our placements
    for key, value in placements.items():
        # If this placement is less than the other one that means its calculating
        if (stat_placements.get(key, 0) < value):
            # Get the placement number
            new_place = int(re.findall(r'\d+', key)[0])
            # If its less than it is more important
            # place 1 is better than place 3, but place1 affects place 3
            if new_place < place:
                place = new_place

    if place == 1:
        placement = 'Victory'
    elif place != 101:
        placement = 'Top {}'.format(place)

    kills = data.get('kills', 0) - stat.kills

    if kills >= 0 and kills <= 99:
        return Game(stat_id=stat.id, placement=placement, kills=kills)

    return None