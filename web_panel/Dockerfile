FROM node:12

WORKDIR /usr/src/panel

COPY package.json package.json
RUN npm install

COPY . .

VOLUME /usr/src/panel/build
VOLUME /usr/src/panel/src
ENTRYPOINT ["./entrypoint.sh"]
