FROM node:16.13.1-alpine

# Need curl to run health checks
RUN apk update && apk add curl

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Add rest of the client code
COPY . .

EXPOSE 3000

CMD yarn start