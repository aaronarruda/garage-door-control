sudo apt-get install python-pip

sudo pip install flask tornado configparser

# TODO:
# Install RPi-Cam-Web-Interface

# Add the following to nginx config file (/etc/nginx/sites-enabled/rpicam)
# This makes available the live preview outside of the authentication
# necessary for the RPi-Cam-Web-Interface management interface

# location /preview {
# 	alias /dev/shm/mjpeg/cam.jpg;
# }