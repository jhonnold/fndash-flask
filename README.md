# Fortnite Dashboard

![screenshot](https://i.imgur.com/PSKbu7t.png)

This is a simple fortnite dashboard designed to allow a select group of people quick access to all their stats. We track all the standard statistics that are avaialable to us (kills/placements/matches), and also generate stats on a *game* to *game* basis.

## First Time Setup (Development)
```
$ docker-compose build
$ docker-compose up -d 
```
This will build the multiple applications (main app, postgres, redis, celery) and launch them. 
```
$ docker-compose exec postgres bash
  # psql -U [user]
  # CREATE DATABASE "[db]"
  # \q
  # exit
```
This loads us into the postgres container and creates the necessary database.
```
$ docker-compose exec app bash
  # flask db upgrade
  # exit
```
Finally, we load into the app container and migrate the database

Go to [localhost:5000](http://localhost:5000) to see the app

## Executing Migrations

```
$ docker-compose exec app bash
```
Simply load into the app container and follow the [Flask-Migration Docs](https://flask-migrate.readthedocs.io/en/latest/#example)

*Please note that alembic isn't magic and needs to have certain migrations checked*

## Project Layout

```
.
+-- _app (The flask application)
|   +-- _models (Database model files)
|   +-- _modules (Blueprints for the application)
|   +-- _static (Static files for app)
|   +-- _tasks (Celery tasks)
|   +-- _templates (Template files for app)
|   +-- __init__.py (Main core of Flask app)
|   +-- celeryconfig.py
|   +-- config.py
|   +-- database.py
+-- _migrations (Database migrations folder, managed by alembic)
+-- _util (Bash scripts for Docker mostly)
+-- docker-compose.override.yml (Override for development purposes)
+-- docker-compose.yml (Main docker-compose management file)
+-- Dockerfile (Builds the flask app)
+-- DockerfileCelery (Builds the celery app)
+-- LICENSE
+-- manage_celery.py (Python script file to start celery)
+-- manage.py (Python script file for managing the app)
+-- README.md
+-- requirements.txt
