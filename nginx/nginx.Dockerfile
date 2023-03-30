FROM nginx:1.21.4

COPY magoodgan.conf /etc/nginx/sites-available/
RUN mkdir -p /etc/nginx/sites-enabled/
RUN ln -f -s /etc/nginx/sites-available/magoodgan.conf /etc/nginx/sites-enabled/

COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g 'daemon off;'