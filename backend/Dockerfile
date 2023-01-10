FROM node

WORKDIR '/app'

COPY ./package.json ./

RUN npm install --omit=dev

COPY . .

CMD ["npm", "run", "build" ]