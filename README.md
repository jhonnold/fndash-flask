# Fortnite Dashboard

##### TODO Description 

## First Time Setup
```
$ docker-compose build
$ docker-compose up -d 
```
This will build the multiple applications (main app, postgres) and launch them. 
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

Go to [0.0.0.0:5000](http://0.0.0.0:5000) to see the app

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
|   +-- _static (Static files for app)
|   +-- _templates (Template files for app)
|   +-- _migations (Database migrations folder, managed by alembic)
|   +-- config.py
|   +-- main.py (Main file for the application)
|   +-- manage.py (Python script file for managing the app)
|   +-- Dockerfile
|   +-- requirements.txt
+-- _worker (The worker app to update the DB)
+-- docker-compose.override.yml (Override for development purposes)
+-- docker-compose.yml (Main docker-compose management file)
+-- LICENSE
+-- README.md
