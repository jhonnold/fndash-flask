### Link Inputs

# users = User.query.all()
# for user in users:
#     i = Input(user_id=user.id, input_type='keyboardmouse')
#     db.session.add(i)

# db.session.commit()


### Link Stats
# >>> stats = Stat.query.all()
# >>> for stat in stats:
# ...     i = Input.query.filter_by(user_id=stat.user.id).first()
# ...     stat.input_id = i.id
# ...
# >>> db.session.commit()

### Link Games
# games = Game.query.all()
# for game in games:
#     stat = Stat.query.filter_by(user_id=game.user_id, name=game.playlist, mode=game.mode).first()
#     game.stat_id = stat.id
#     print("Game ID: {} getting Stat ID: {}".format(game.id, stat.id))
# db.session.commit()