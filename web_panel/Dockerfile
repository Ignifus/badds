FROM node:alpine

VOLUME /usr/src/panel/build

WORKDIR /usr/src/panel

COPY . .

RUN npm install
RUN npm run build
