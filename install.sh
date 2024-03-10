
sudo apt-get remove node -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
cd nodejs/
npm install
bash dbinstall.sh
cd ../angular/
npm install
