FROM node:alpine
WORKDIR /usr/src/backend
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN npm run prestart
CMD ["npm", "run", "start" ]