#!/bin/bash

# Docker scrip to run like this
# docker run --rm --name chat-server --net=host chat-server:latest start.sh -h 8080 -w 9090 -r 127.0.0.1:6379

cd $APP_ROOT
node ./chat-server.js $@
