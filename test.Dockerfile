FROM node:14-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./tests/utils/wait-for-it-test.sh

RUN npm i nodemon -g

CMD ["./wait-for-it.sh", "dbtest:5432", "--", "npm","run","start-dev"]

EXPOSE 3001
