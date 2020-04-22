# Specifying the sha is to guarantee that CI will not try to rebuild from the
# source image (i.e. node:13.5), which apparently CIs are bad at avoiding on
# their own.
# Using buster-slim instead of alpine, because there's an open issue
# about flow not working on alpine, and the response is *shrug*
FROM node:13.12.0-buster-slim@sha256:cc0d8c39734f51153a52a35bcec871b0829b7cfe256fb39583b3dfc54a323314

RUN apt-get --no-install-recommends update \
  && apt-get -y --no-install-recommends install git wget ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

# Someone getting fancy with the package installs needs git & valid certificates
# to install via https
RUN mkdir /usr/local/share/ca-certificates/cacert.org
RUN wget -P /usr/local/share/ca-certificates/cacert.org http://www.cacert.org/certs/root.crt http://www.cacert.org/certs/class3.crt
RUN update-ca-certificates
RUN git config --global http.sslCAinfo /etc/ssl/certs/ca-certificates.crt

# Update yarn to avoid warning messages
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Add rest of the client code
COPY . .

RUN yarn build

# Adonis uses env vars to set host & port.
# PORT value needs to be based on previous env var to work with how Heroku
# runs Docker containers.
ENV HOST=0.0.0.0
ENV PORT=${PORT:-3000}

EXPOSE $PORT

CMD yarn start
