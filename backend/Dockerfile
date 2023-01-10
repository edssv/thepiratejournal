FROM node as Production

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

CMD ['sh', '-c', "npm", "run", "build" ]