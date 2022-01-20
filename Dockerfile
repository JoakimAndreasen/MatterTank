FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9090

EXPOSE 9090

CMD [ "npm", "start" ]