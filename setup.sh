sudo apt-get update

sudo apt-get install -y git
wget https://nodejs.org/dist/latest-v6.x/node-v6.9.2-linux-armv6l.tar.gz
tar -xvf node-v6.9.2-linux-armv6l.tar.gz
# add new node directory to path
npm install -g create-react-app
echo "export PATH=$PATH:/home/pi/node-v6.9.2-linux-armv6l/bin" >> .profile

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

#         root /home/pi/garage-door-control/ui/build;
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
npm run build