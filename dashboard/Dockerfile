FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf