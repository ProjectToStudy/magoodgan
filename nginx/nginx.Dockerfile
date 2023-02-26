FROM nginx:1.21.4

COPY nginx.conf /etc/nginx/nginx.conf
COPY magoodgan.conf /etc/nginx/sites-available/magoodgan.conf

RUN mkdir -p /etc/nginx/sites-enabled/  \
    && ln -f -s /etc/nginx/sites-availabled/magoodgan.conf /etc/nginx/sites-enabled/
CMD nginx -g 'daemon off;'