FROM python:3.7
ENV PYTHONUNBUFFERED 1

VOLUME /usr/src/web/static
VOLUME /usr/src/web/static/panel
VOLUME /usr/src/web/uwsgi

WORKDIR /usr/src/web

COPY . .
RUN cd server && pip install -r requirements.txt

ENTRYPOINT ["./entrypoint.sh"]
