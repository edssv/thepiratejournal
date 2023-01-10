FROM nginx 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]