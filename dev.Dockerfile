FROM node:14-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./wait-for-it.sh

RUN npm i nodemon -g

CMD ["./wait-for-it.sh", "db:5432", "--", "npm","run","start-dev"]

EXPOSE 3001