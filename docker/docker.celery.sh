#!/bin/sh
if [ -f /tmp/celerybeat.pid ]
then
  kill -9 $(cat /tmp/celerybeat.pid)
  rm /tmp/celerybeat.pid
fi

celery beat -A manage.celery --schedule=/tmp/celerybeat-schedule --loglevel=DEBUG --pidfile=/tmp/celerybeat.pid &
celery worker -A manage.celery -P eventlet -c 100 --loglevel=DEBUG &
tail -f /dev/null