#!/bin/sh
if [ -f /tmp/celerybeat.pid ]
then
  kill -9 $(cat celerybeat.pid)
  rm /tmp/celerybeat.pid
fi

celery beat -A manage.celery --schedule=/tmp/celerybeat-schedule --loglevel=WARNING --pidfile=/tmp/celerybeat.pid &
celery worker -A manage.celery -P eventlet -c 100 --loglevel=WARNING &
tail -f /dev/null