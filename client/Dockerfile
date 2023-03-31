FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf