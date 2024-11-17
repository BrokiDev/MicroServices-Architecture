FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY ./ ./

EXPOSE 3003

CMD ["npm", "start"]
