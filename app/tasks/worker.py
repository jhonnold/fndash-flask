import celery, requests, json

from app import User

@celery.task()
def update_stats():
  users = User.query.all()
  for user in users:
    r = requests.get("https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id={}&platform=pc".format(user.uid))
    if r.json['stats']['lastmodified_total'] != user.lastmodified_total:
      user.kills_total = r.json()['stats']['kills_total']
      user.wins_total = r.json()['stats']['wins_total']
      user.matchesplayed_total = r.json()['stats']['matchesplayed_total']
      user.hoursplayed_total = r.json()['stats']['hoursplayed_total']
      user.lastmodified_total = r.json()['stats']['lastmodified_total']
      user.kills_solo = r.json()['stats']['kills_solo']
    print(r.json()['stats'])