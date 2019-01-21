# Pull base image
FROM node:11-slim

ENV APP_ROOT=/opt/chat
WORKDIR $APP_ROOT

# Copy sources
COPY . .

# Setting/building
RUN npm install
COPY bin/start.sh bin/dev-tools.sh /bin/

# Command to run by default. Add arguments if required, f.e.:
# CMD ["/bin/start.sh", "-h 8080", "-w 9090", "-r 127.0.0.1:6379"]
CMD ["/bin/start.sh"]
