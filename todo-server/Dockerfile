FROM node:12-alpine

WORKDIR /app
#copy package.json to workdir
COPY package*.json ./
#install dependencies
RUN npm install
#copy contents to workdir
COPY . .

EXPOSE 5000

CMD ["npm","start"]
