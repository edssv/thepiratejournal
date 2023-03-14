FROM nginx:alpine as dev
COPY nginx.dev.conf /etc/nginx/nginx.conf

FROM nginx:alpine as prod
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl /etc/nginx/ssl