FROM node:latest

RUN echo "running prod mode"

RUN apt-get update

# libki niezbędne do poprawnego działania środowiska
# RUN apt-get -y install python
# RUN apt-get -y install build-essential checkinstall

COPY . ./app
WORKDIR /app

# -g
# hardhat
# nodemon
# typescript

# i

RUN npm install -g concurrently
RUN npm i -g hardhat
RUN npm i -g ganache-cli
RUN npm i -g nodemon

RUN npm install

ENTRYPOINT [ "npm", "run", "run-server" ] 


