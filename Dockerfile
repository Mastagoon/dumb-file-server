FROM node:16

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080

RUN npm run build

CMD node dist/app.js
