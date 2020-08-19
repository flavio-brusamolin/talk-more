FROM node:12.18.2
LABEL maintainer "Flavio Brusamolin"

WORKDIR /usr/src/app/web

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
