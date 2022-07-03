FROM node:lts-slim

ENV PATH=$PATH:/app/node_modules/.bin

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        wait-for-it

WORKDIR /app
COPY . .
