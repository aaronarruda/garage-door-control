FROM droogmic/rpi-cam-web:20170112

COPY rpicam_with_preview_nginx.conf /etc/nginx/sites-available/rpicam
COPY raspimjpeg /etc/raspimjpeg
COPY schedule.json /var/www/schedule.json

ENTRYPOINT ["rpi-cam-web"]
