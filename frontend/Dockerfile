FROM node as Production

ENV NODE_END=production

WORKDIR /usr/src/frontend

COPY package.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ['sh', '-c', "npm run start:production" ]