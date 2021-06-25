FROM cypress/browsers:node14.16.0-chrome90-ff88@sha256:17caf352a1a2a8bf22eb0c40b85751dde93409efffeb5db3d14c22be2ddd6152
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
