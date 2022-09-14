FROM nginx:1.21.4

COPY . /nginx
WORKDIR /nginx

RUN chmod +x ./wait-for-it.sh
# RUN ./wait-for-it.sh django:8000 --timeout=0 -- nginx -g 'daemon off;'
