ENV["LC_ALL"] = "en_US.UTF-8"
Vagrant.configure("2") do |config|
  config.vm.box = "minimum/ubuntu-trusty64-docker"
  config.vm.hostname = "ubuntu-docker"
  config.vm.network "private_network", type: "dhcp"
  config.vm.network "forwarded_port", guest: 5353, host: 6363, protocol: "tcp"
  
  config.vm.provider "virtualbox" do |vb|
	vb.memory = "2048"
  end
end
