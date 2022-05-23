FROM node:lts-slim

ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app
COPY . .
