#!/usr/bin/env bash

#installing required compiling tools:
echo "installing required tools"
apk update
apk add --no-cache make gcc g++ python
apk add python

echo "installing dependencies..."

npm install
npm rebuild bcrypt --build-from-source

apk del make gcc g++ python

echo "Starting API TODO-server"
npm run start:dev

# RUN apk add --no-cache make gcc g++ python && \
#   npm install && \
#   npm rebuild bcrypt --build-from-source && \
#   apk del make gcc g++ python