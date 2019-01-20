import celery, requests

from app import User, db

@celery.task()
def update_stats():
  users = User.query.all()
  for user in users:
    r = requests.get("https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id={}&platform=pc".format(user.uid))
    data = r.json()

    if data['totals']['lastupdate'] != user.lastmodified_total:
      user.kills_total = data['totals']['kills']
      user.wins_total = data['totals']['wins']
      user.matchesplayed_total = data['totals']['matchesplayed']
      user.hoursplayed_total = data['totals']['hoursplayed']
      user.lastmodified_total = data['totals']['lastupdate']
      
      if data['stats']['lastmodified_solo'] != user.lastmodified_solo:
        user.kills_solo = data['stats']['kills_solo']
        user.placetop1_solo = data['stats']['placetop1_solo']
        user.placetop10_solo = data['stats']['placetop10_solo']
        user.placetop25_solo = data['stats']['placetop25_solo']
        user.matchesplayed_solo = data['stats']['matchesplayed_solo']
        user.minutesplayed_solo = data['stats']['minutesplayed_solo']
        user.lastmodified_solo = data['stats']['lastmodified_solo']
      
      if data['stats']['lastmodified_duo'] != user.lastmodified_duo:
        user.kills_duo = data['stats']['kills_duo']
        user.placetop1_duo = data['stats']['placetop1_duo']
        user.placetop5_duo = data['stats']['placetop5_duo']
        user.placetop12_duo = data['stats']['placetop12_duo']
        user.matchesplayed_duo = data['stats']['matchesplayed_duo']
        user.minutesplayed_duo = data['stats']['minutesplayed_duo']
        user.lastmodified_duo = data['stats']['lastmodified_duo']
      
      if data['stats']['lastmodified_squad'] != user.lastmodified_squad:
        user.kills_squad = data['stats']['kills_squad']
        user.placetop1_squad = data['stats']['placetop1_squad']
        user.placetop3_squad = data['stats']['placetop3_squad']
        user.placetop6_squad = data['stats']['placetop6_squad']
        user.matchesplayed_squad = data['stats']['matchesplayed_squad']
        user.minutesplayed_squad = data['stats']['minutesplayed_squad']
        user.lastmodified_squad = data['stats']['lastmodified_squad']

      db.session.commit()
