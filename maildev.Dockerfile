FROM node:18.16.0-alpine

RUN yarn global add maildev@2.0.5

CMD maildev