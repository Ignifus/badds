FROM python:3.7
ENV PYTHONUNBUFFERED 1

VOLUME /usr/src/web/static
VOLUME /usr/src/web/static/panel
VOLUME /usr/src/web/uwsgi

WORKDIR /usr/src/web

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT ["./entrypoint.sh"]
