# Specifying the sha is to guarantee that CI will not try to rebuild from the
# source image (i.e. node:13.5), which apparently CIs are bad at avoiding on
# their own.
# Using buster-slim instead of alpine, because there's an open issue
# about flow not working on alpine, and the response is *shrug*
FROM node:14.1.0-buster-slim@sha256:798ceb092256294ce7b629384994af4fe3a9a36a9eead7d09348e9d8e59f0b78

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

RUN yarn run build

# PORT value needs to be based on previous env var to work with how Heroku
# runs Docker containers.
ENV PORT=${PORT:-3000}

EXPOSE $PORT

CMD yarn start