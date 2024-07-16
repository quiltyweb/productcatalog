#!/bin/bash

DOCKER_COMPOSE_FILE="${1:-docker-compose.ci.yml}"

# Need to create test DB separately because TypeORM won't do it for us
docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db \
  cockroach sql --execute "CREATE DATABASE IF NOT EXISTS test;" --insecure

docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T server \
  yarn run migration:run -d src/dataSource.ts

EXIT_CODE=$?

if [ ${EXIT_CODE} == 0 ]
then
  docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T server yarn test:integration

  EXIT_CODE=$?
fi

# TEST CLEANUP
docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db \
  cockroach sql --execute "DROP DATABASE IF EXISTS test;" --insecure

exit ${EXIT_CODE}
