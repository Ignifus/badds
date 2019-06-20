FROM python:3.7

WORKDIR /usr/src/web

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED 1
VOLUME /usr/src/web/static
VOLUME /usr/src/web/templates
VOLUME /usr/src/web/landing
VOLUME /usr/src/web/badds
VOLUME /usr/src/web/ads

ENTRYPOINT ["./entrypoint.sh"]
