FROM node:8.11.3-alpine
RUN npm install -g nodemon yarn

RUN mkdir /node

WORKDIR /node
COPY . /node

RUN  npm install 