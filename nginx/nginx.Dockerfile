# nginx.dockerfile
FROM nginx:1.21.4

COPY magoodgan.cf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
