FROM node:12-alpine

MAINTAINER dosseh shalom <dossehshalom@gmail.com>

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 80

EXPOSE 80

CMD ["npm", "start"]
