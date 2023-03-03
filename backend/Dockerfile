FROM node as Production

ENV NODE_ENV=production

WORKDIR /usr/src/backend

COPY ./package.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run prestart

CMD ["npm", "run", "start" ]