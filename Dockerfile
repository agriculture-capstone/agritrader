FROM node:8.9.1

RUN yarn global add tslint typescript tslint-react

WORKDIR /agritrader
