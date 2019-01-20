FROM nginx:latest

WORKDIR /usr/src/app

# install dependencies
RUN apt-get update
RUN apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs 

# build app
COPY ./src/webapp-public /usr/src/app
RUN UMI_ENV=docker ./node_modules/.bin/umi build

# copy built app to nginx html
RUN rm -rf /usr/share/nginx/html
RUN mv /usr/src/app/dist /usr/share/nginx/html

# clean up
RUN rm -rf /usr/src/app
