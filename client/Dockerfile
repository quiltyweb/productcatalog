# Specifying the sha is to guarantee that CI will not try to rebuild from the
# source image (i.e. node:13.5), which apparently CIs are bad at avoiding on
# their own.
# Using buster-slim instead of alpine, because there's an open issue
# about flow not working on alpine, and the response is *shrug*
FROM node:15.11.0-buster-slim@sha256:04c2da89b1ccc8634371229fbd7e8e84077374455790a48e35b96d351f9cdacf

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Add rest of the client code
COPY . .

EXPOSE 3000

CMD yarn start