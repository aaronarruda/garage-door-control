FROM droogmic/rpi-cam-web

COPY preview_nginx.conf /etc/nginx/sites-available/preview
RUN ln -s /etc/nginx/sites-available/preview /etc/nginx/sites-enabled/.

ENTRYPOINT ["rpi-cam-web"]
