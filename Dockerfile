# We're currently building the production image in the Heroku build context,
# which means we either have to pull images from DockerHub or build them
# from scratch here. We don't have a DockerHub account set up for this project,
# so we just build them for now.
FROM node:16.18.1-alpine AS client

WORKDIR /app

COPY client/package.json client/yarn.lock ./
RUN yarn

COPY ./client .
RUN yarn build

FROM node:16.18.1-alpine

WORKDIR /app

RUN apk update \
  && apk add git wget ca-certificates curl bash
# Someone getting fancy with the package installs needs git & valid certificates
# to install via https
RUN mkdir /usr/local/share/ca-certificates/cacert.org
RUN wget -P /usr/local/share/ca-certificates/cacert.org http://www.cacert.org/certs/root.crt http://www.cacert.org/certs/class3.crt
RUN update-ca-certificates
RUN git config --global http.sslCAinfo /etc/ssl/certs/ca-certificates.crt

# Update yarn to avoid warning messages
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

# Install dependencies
COPY server/package.json server/yarn.lock ./
RUN yarn

COPY ./server .
RUN yarn build

COPY --from=client /app/build /app/dist/build

# PORT value needs to be based on previous env var to work with how Heroku
# runs Docker containers.
EXPOSE ${PORT:-80}
CMD yarn start
