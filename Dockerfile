# Image to build from
FROM node:latest

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package*.json ./
RUN yarn import --silent
RUN yarn add react-scripts -g 

# removed source code from image

# Map port to the Docker daemon
EXPOSE 3000

# Run the start script
CMD [ "npm", "start" ]
