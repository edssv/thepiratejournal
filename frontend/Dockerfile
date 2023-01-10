FROM node as build

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html