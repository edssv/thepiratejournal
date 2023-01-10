FROM node as Production

WORKDIR /usr/src/backend

COPY package.json .

RUN npm install --omit=dev

COPY . .

CMD [ "npm", "run", "build" ]