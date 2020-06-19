# We're currently building the production image in the Heroku build context,
# which means we either have to pull images from DockerHub or build them
# from scratch here. We don't have a DockerHub account set up for this project,
# so we just build them for now.
FROM node:14.3.0-buster-slim@sha256:57547465effe6d06ed538dd12ea1ef7f4ed15255822f0b709399c7d2d5f2ff1c AS client

WORKDIR /app

COPY client/package.json client/yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM node:14.4.0-buster-slim@sha256:c92f4bc74b3233c22d94b264f2912a8935839a008d8c55174cefc5fce9610c7a

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

# Install dependencies
COPY server/package.json server/yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

COPY --from=client /app/build /app/dist/build

# PORT value needs to be based on previous env var to work with how Heroku
# runs Docker containers.
EXPOSE ${PORT:-80}
CMD yarn start
