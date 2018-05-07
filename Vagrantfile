ENV["LC_ALL"] = "en_US.UTF-8"

$INSTALL_DOCKER_COMPOSE = <<SCRIPT
sudo DEBIAN_FRONTEND=noninteractive 
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo apt-get update
sudo apt-get install -y git
sudo mkdir -p /home/vagrant/workspaces
sudo mkdir -p ~/.ssh
sudo chmod 700 ~/.ssh
sudo ssh-keyscan -H github.com >> ~/.ssh/known_hosts
sudo usermod -aG docker vagrant
cd /home/vagrant/workspaces && git clone https://github.com/tranchiendang/Microservices-Hydra-Express.git
sudo chown -R vagrant:vagrant /home/vagrant/workspaces
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "ubuntu-docker"
  config.vm.network "private_network", type: "dhcp"
  config.vm.network "forwarded_port", guest: 5353, host: 5353, protocol: "tcp"
  config.vm.network "forwarded_port", guest: 8000, host: 8000, protocol: "tcp"
  config.vm.network "forwarded_port", guest: 9411, host: 9411, protocol: "tcp"
  config.vm.provision "shell", inline: $INSTALL_DOCKER_COMPOSE
  
  config.vm.provider "virtualbox" do |vb|
	vb.memory = "2048"
	vb.name = "ubuntu-docker"
  end
end
