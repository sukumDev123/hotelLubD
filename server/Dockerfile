FROM node:8.11.2-alpine

RUN npm install -g nodemon yarn

RUN mkdir /node
WORKDIR /node

COPY package.json /node

RUN yarn

COPY . /node