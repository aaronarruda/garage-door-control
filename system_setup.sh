sudo apt-get update

# http://blog.alexellis.io/getting-started-with-docker-on-raspberry-pi/
curl -sSL get.docker.com | sh
sudo systemctl enable docker
sudo usermod -aG docker pi

sudo apt-get install -y python-pip

sudo pip install virtualenv
virtualenv ~/docker-compose
source ~/docker-compose/bin/activate
pip install docker-compose