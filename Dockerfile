FROM node:latest

RUN mkdir -p ./myapp
WORKDIR /myapp1

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]