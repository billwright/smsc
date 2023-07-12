# This is based on Debian Linux. You can see this by typing:
#
#       > cat /etc/os-release
#
#       PRETTY_NAME="Debian GNU/Linux 11 (bullseye)"
#        NAME="Debian GNU/Linux"
#        ...

# FROM node -- points to the bullseye image
# FROM node:bullseye
# FROM node:lts-bullseye-slim     (lts stands for Long Term Support)
# FROM node:alpine  -- alpine version of Linux is known for small size and less vulnerabilities, accordingly
FROM node:20-bullseye-slim

# Debian and Ubuntu use the apt-get package manager
# Install any extra tools you might want
RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install nano -y
RUN apt-get install curl -y

# Create the install directory in the image and switch to it
WORKDIR /usr/src/app

# First copy package.json (and package-lock.json) and do an npm 
# build so that subsquent docker builds might be even faster
# because Docker is built by layers
COPY ./package*.json ./

# Build your application
ENV NODE_ENV production
RUN npm clean-install --only=production

# Now copy your source code, as this will change more often than the above packages
# It is a best practice to run the node process as a non-root user
# but Azure deployment has a problem with port mapping so I'm
# running here as root.
#COPY --chown=node:node src/main/fibonacci /usr/src/app
COPY environments/ /usr/src/app
COPY modules/ /usr/src/app
COPY public/ /usr/src/app
COPY views/ /usr/src/app
COPY index.js /usr/src/app
COPY .env /usr/src/app

# Expose the port where we have the node server listening
# EXPOSE 3000
# Azure doesn't do port mapping, so if you want a clean URL,
# use port 80 (this must be set in node as well, like in the bin/www file)
EXPOSE 80

# Start up your application. Use the principle of least privilege
# USER node -- see above on why I'm running as root
# CMD ["node", "./bin/www"]
CMD ["npm", "start"]




