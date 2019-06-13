#!/bin/sh

echo "Creating super user if needed.."
echo "from django.contrib.auth.models import User; User.objects.create_superuser(os.environ['ADMIN_USER'], 'admin@example.com', os.environ['ADMIN_PASSWORD'])" | python manage.py shell;

echo "Collecting static files.."
python manage.py collectstatic --noinput

echo "Applying database migrations.."
python manage.py migrate

echo "Applying fixtures.."
python manage.py loaddata ads

echo "Running web"
uwsgi uwsgi/uwsgi.ini
