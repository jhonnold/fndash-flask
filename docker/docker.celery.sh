#!/bin/sh
if [ -f /tmp/celerybeat.pid ]
then
  kill -9 $(cat /tmp/celerybeat.pid)
  rm /tmp/celerybeat.pid
fi

celery beat -A manage.celery --schedule=/tmp/celerybeat-schedule --loglevel=WARN --pidfile=/tmp/celerybeat.pid &
celery worker -A manage.celery -P eventlet -c 1000 --loglevel=WARN &
celery flower -A manage.celery --port=5555 &
tail -f /dev/null