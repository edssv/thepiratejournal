FROM node:alpine
WORKDIR /usr/src/backend
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "run", "start:dev" ]