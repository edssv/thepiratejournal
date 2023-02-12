FROM node as Production

ENV NODE_ENV=production

WORKDIR /usr/src/admin-panel

COPY ./package.json . /

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start:production" ]