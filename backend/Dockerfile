FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

RUN npm install --production

EXPOSE 80

CMD [ "npm", "run", "build" ]