from app import create_app, db

app, celery = create_app()
app.app_context().push()