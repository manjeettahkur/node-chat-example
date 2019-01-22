# Introduction
This is repository for sample chat app written on Node.js

# Dependencies
* Node.js
* Express framework
* WebSockets (not websocket.io)
* Redis

# Installation
1. Install Node.js (https://nodejs.org/en/)
2. Download or clone repository
3. Change directory to test app
    >`$ cd node-chat-example`
4. Instal dependencies
    >`$ npm install`
5. Setup (or bring up) Redis
    * This can be easily done with docker. For example: 
    >`$ sudo docker run --name redis -d redis:5.0.3-alpine`
6. Run chat app
    >`$ node ./chat-server.js -h 8080 -w 9090 -r 127.0.0.1:6379`
7. Open browser for http://localhost:8080/
8. Enjoy chat app ;-)

# Instructions
You can easily get app instructions about command line params by running
>`$ node ./chat-server.js --help`

# Dockerization
Its possible to run this app inside of Docker container. To do so perform following steps:
1. Change directory to app directory
    >`$ cd node-chat-example`
2. Build docker image from Dockerfile provided
    >`$ docker build -t chat-server .`
3. Run image with command like this:
    >`$ docker run --rm --net=host chat-server:latest start.sh -h 8080 -w 9090 -r 127.0.0.1:6379`
4. Container can be stoped with command like this:
    >`$ docker stop chat-server`

