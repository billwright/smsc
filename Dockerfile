FROM node:19-bullseye-slim

# Install your application
WORKDIR /usr/src/app

# First your source files
COPY src/main/hello_server.js ./

EXPOSE 3000

# Start up your application
CMD ["node", "hello_server.js"]
