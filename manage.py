from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app, db, celery
from app.models import Game, User, Stat, StatHistory, Input

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def runserver():
    app.run(host='0.0.0.0', port=5000)


@manager.command
def runworker():
    app.run(debug=False)


@app.shell_context_processor
def make_shell_context():
    return dict(app=app, db=db, migrate=migrate, User=User, Game=Game, Stat=Stat, StatHistory=StatHistory, Input=Input)


if __name__ == "__main__":
    manager.run()
