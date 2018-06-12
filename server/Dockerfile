FROM node:8.11.2-alpine

RUN npm install -g nodemon yarn

RUN mkdir /node

COPY . /node
WORKDIR /node

RUN  npm install
