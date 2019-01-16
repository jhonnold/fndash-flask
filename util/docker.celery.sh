#!/bin/sh
if [ -f /tmp/celerybeat.pid ]
then
  kill -9 $(cat celerybeat.pid)
  rm /tmp/celerybeat.pid
fi

celery beat -A app.celery --schedule=/tmp/celerybeat-schedule --loglevel=INFO --pidfile=/tmp/celerybeat.pid &
celery worker -A app.celery --loglevel=INFO &
tail -f /dev/null