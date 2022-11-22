FROM node:19.1
##Create work dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
##Copy needed files
COPY src /usr/src/app/
COPY package.json package-lock.json /usr/src/app/
COPY .env /usr/src/app/
##Install dependencies
RUN npm install
RUN npm -v 


