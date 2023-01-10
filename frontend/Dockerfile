FROM node as Production

WORKDIR /usr/src/frontend

COPY package.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD [ "npm run start:production" ]