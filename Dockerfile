# Using client image for dev environment as base to avoid duplicating
# building the image, because Docker doesn't cache intermediate images
# in multistage builds
FROM productcatalog_client:latest AS client

WORKDIR /app

RUN yarn build

FROM productcatalog_server:latest AS server

RUN yarn build

COPY --from=client /app/build /app/dist/build

EXPOSE ${PORT:-80}

CMD yarn start
