import celery, requests

from app import User

@celery.task()
def update_stats():
  users = User.query.all()
  for user in users:
    r = requests.get("https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id={}&platform=pc".format(user.uid))
    print(r.json())