FROM cypress/browsers:node10.16.0-chrome77@sha256:df704dfda7c6e453e78f2f075a9a6a23c428f97dd1b5d09b015adcd05079eca1
WORKDIR /app

COPY package.json yarn.lock ./

# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1
RUN yarn
# verify that Cypress has been installed correctly.
# running this command separately from "cypress run" will also cache its result
# to avoid verifying again when running the tests
RUN npx cypress verify

COPY . .
