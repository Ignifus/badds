#!/bin/sh

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Apply database migrations"
python manage.py migrate

echo "Apply fixtures"
python manage.py loaddata ads

echo "Running web"
uwsgi uwsgi/uwsgi.ini
