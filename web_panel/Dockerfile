FROM node:alpine

VOLUME /usr/src/panel/build
VOLUME /usr/src/panel/src

WORKDIR /usr/src/panel

COPY package.json package.json
run apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

COPY . .

CMD npm run dev
