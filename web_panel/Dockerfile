FROM node:12

WORKDIR /usr/src/panel

COPY . .

VOLUME /usr/src/panel/build
VOLUME /usr/src/panel/src
ENTRYPOINT ["./entrypoint.sh"]
