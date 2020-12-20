FROM node:latest

RUN mkdir -p ./new/app
WORKDIR ./new/app

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]