FROM node:20-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "serve", "-s", "dist", "-p","5000"]
