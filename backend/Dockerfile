FROM node:20-alpine3.19

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node","app.js"]