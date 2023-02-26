FROM nginx:1.21.4

COPY nginx.conf /etc/nginx/nginx.conf
COPY magoodgan.conf /etc/nginx/sites-available/magoodgan.conf

CMD nginx -g 'daemon off;'