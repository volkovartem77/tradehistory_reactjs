# Trade history bot for Binance. Deploy on server Ubuntu 16, 18

## INSTALL NODE.JS & NPM

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

**Install all dependencies in package.json**
```
cd ~/tradehistory_reactjs/
sudo npm install
sudo npm install simple-websocket
```
> No worries if you see follow warnings
```
npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.2.9
```

**Fix the package bug**\
https://github.com/rrag/react-stockcharts/issues/721

Chart CHART position in div has been dislocated\
Please change position to "relative" to fix\
Path: ~/tradehistory_reactjs/node_modules/react-stockcharts/lib/\
ChartCanvas.js Line2227:\
```{ className: className, width: width, height: height, style: { position: "absolute", zIndex: zIndex + 5 } }```

> Check the websocket address in src/App.js line 27 new Socket initialization. It should be you external IP.

# Run app (docker)
## Install docker container
> For username **root**. If you have another username - change **root** at third line
```
cd ~/tradehistory_reactjs
curl -sSL https://get.docker.com | sh
usermod -aG docker root
curl -L https://github.com/docker/compose/releases/download/1.23.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker ps
docker_compose ps
```
Create a config file\
```nano docker-compose.yaml```

Add this config into it\
```
version: '3'
   services:
     example.org:
       image: flashspys/nginx-static
       container_name: example.org
       ports:
         - 8080:80
       volumes: 
         - ./build:/static
 ```
 Ctrl-X and press Y to save it and close
 
 The next step is to build the project by the following command:\
 ```npm run build```\
 After it is built run docker\
 ```docker-compose up -d```\
 And go to http://your_external_ip:8080
 
 ### usefull commands
 One liner to stop / remove all of Docker containers:
 ```
 docker stop $(docker ps -a -q)
 docker rm $(docker ps -a -q)
```