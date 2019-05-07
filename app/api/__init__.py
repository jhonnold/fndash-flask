from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api/v3')

from . import users
from . import inputs
from . import stats
from . import games