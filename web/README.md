# Badds



## Installation

* Run `pip install -r requirements.txt`
* Make sure to have postgresql installed and running, database badds and user badds (no password).

## Configuration

For configuring a different database url, set DATABASE_URL env variable.

For confirmation email proper functioning, add the BADDS_EMAIL_PASSWORD 
env variable to your system before executing manage.py runserver.

For Cloudinary, add CLOUDINARY_URL env variable with the Cloudinary API key.

For Google captcha, add a BADDS_CAPTCHA_SECRET env variable.

## Running
* `python manage.py migrate`
* `python manage.py loaddata ads`
* `python manage.py runserver`

