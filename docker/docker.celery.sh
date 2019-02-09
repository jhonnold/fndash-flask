#!/bin/sh
if [ -f /tmp/celerybeat.pid ]
then
  kill -9 $(cat celerybeat.pid)
  rm /tmp/celerybeat.pid
fi

celery beat -A manage_celery.celery --schedule=/tmp/celerybeat-schedule --loglevel=INFO --pidfile=/tmp/celerybeat.pid &
celery worker -A manage_celery.celery --loglevel=INFO &
tail -f /dev/null