FROM resin/rpi-raspbian:jessie

RUN apt-get update && apt-get install -y \
  nginx 

COPY nginx.config /etc/nginx/sites-available/garage-door-control
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/garage-door-control /etc/nginx/sites-enabled/default
COPY build/ /garage-door-control/build/

EXPOSE 80

CMD nginx -g "daemon off;"