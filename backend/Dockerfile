FROM node as Production

ENV NODE_END=production

WORKDIR /usr/src/backend

COPY package.json .

RUN npm install --omit=dev

COPY . .

CMD ['sh', '-c', "npm", "run", "build" ]