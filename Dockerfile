# Image to build from
FROM node:latest

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
ADD package*.json ./
RUN npm i --silent
RUN npm i react-scripts -g 

# removed source code from image

# Map port to the Docker daemon
EXPOSE 3000

# Run the start script
CMD [ "npm", "start" ]
