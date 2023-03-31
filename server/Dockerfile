FROM node:alpine
WORKDIR /usr/src/backend
COPY package.json .
RUN yarn install --production
COPY . .
RUN yarn run build
CMD ["yarn", "run", "start:prod" ]