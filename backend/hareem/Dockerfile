FROM node:16-alpine

LABEL maintainer="ignisilva92@gmail.com"

RUN apk add dumb-init

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN apk add --no-cache tini

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4001

USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD [ "npm", "start" ]