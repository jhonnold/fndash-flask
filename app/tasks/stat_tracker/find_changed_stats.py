import celery, hashlib, json

from app import db
from app.tasks import AppContextBase
from app.models import User, Input
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@celery.task(base=AppContextBase, bind=True, name="find_changed_stats")
def find_changed_stats(self, body, user_id):
    user = User.query.filter_by(id=user_id).first()

    if body is None:
        return None, []

    overall_data = body.get('overallData', {})
    data_hash = hashlib.md5(json.dumps(overall_data, sort_keys=True).encode('utf-8')).hexdigest()
    if (user.last_known_data_hash == data_hash):
        logger.info('{} has had no changes!'.format(user))
        return None, []

    data, changed_stats = body.get('data'), []
    for input_type, input_data in data.items():
        _input = Input.query.filter_by(user_id=user.id, input_type=input_type).first()

        if _input is None:
            logger.info('New Input Type for user: {}, input_type: {}'.format(user, input_type))
            _input = Input(user_id=user.id, input_type=input_type)
            db.session.add(_input)
            db.session.commit()

        for playlist, playlist_data in input_data.items():
            for mode, mode_data in playlist_data.items():
                if (playlist in ['defaultsolo', 'defaultduo', 'defaultsquad']):
                    mode = playlist[7:]
                    playlist = 'default'

                stat = _input.stats.filter_by(mode=mode, name=playlist).first()
                if stat is None or stat.matchesplayed != mode_data.get('matchesplayed', 0):
                    changed_stats.append((_input.id, mode, playlist, mode_data))

    return data_hash, changed_stats