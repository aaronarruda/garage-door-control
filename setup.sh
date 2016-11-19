sudo apt-get update

sudo apt-get install -y git
sudo apt-get install -y npm
sudo npm install gulp -g
sudo ln -s /usr/bin/nodejs /usr/bin/node

sudo apt-get install python-pip
sudo pip install flask tornado configparser

# TODO:
# Install RPi-Cam-Web-Interface

# Add the following to nginx config file (/etc/nginx/sites-enabled/rpicam)
# This makes available the live preview outside of the authentication
# necessary for the RPi-Cam-Web-Interface management interface
# and runs the garage-door-control interface.  Change the PIi-Cam to run 
# on port 8080.  This configuration also requires authentication for 
# out of network access.  Access within the network doesn't require 
# authentication.  This configuration also allows the API running on a different
# port to adhere to the Same Origin Policy.

# server {
#         listen 80;

#         root /home/pi/garage-door-control/ui/dist;
#         index index.html;
#         server_name localhost;

#		  location / {
#                 satisfy any;
#                 allow   <local ip block>/24;
#                 deny    <router IP>;
#                 deny    all;
#                 auth_basic "Garage Access";
#                 auth_basic_user_file /etc/nginx/.htpasswd;
#         }

#		  location /garage-door-control/api {
#                 proxy_pass http://<port of API server>:<API port>;
#         }

#         location /preview {
#                 alias /dev/shm/mjpeg/cam.jpg;
#         }
# }

cd /home/pi/garage-door-control/ui
# copy config/globalConfigs.template to config/globalConfigs.js
npm install
gulp