#!/bin/sh

echo "Creating DB if needed.."
python create-db.py

echo "Generating migration files.."
python manage.py makemigrations

echo "You may now stop the container."