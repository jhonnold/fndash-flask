from app.models import User


def get_user(user_id):
    return User.query.filter_by(id=user_id).first()
