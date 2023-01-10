FROM node as Production

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ['sh', '-c', "npm run start:production" ]