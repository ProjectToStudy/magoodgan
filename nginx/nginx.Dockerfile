FROM nginx:1.21.4

COPY magoodgan.cf /etc/nginx/sites-available/
CMD ln -s /etc/nginx/sites-available/magoodgan.cf /etc/nginx/sites-enabled/
COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g 'daemon off;'