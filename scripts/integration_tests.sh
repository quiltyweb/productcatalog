#!/bin/bash

DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"
DEFAULT_NODE_ENV=${NODE_ENV:-""}
export NODE_ENV=test

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
docker-compose -f ${DOCKER_COMPOSE_FILE} pull db
echo "Creating Docker containers..."
docker-compose -f ${DOCKER_COMPOSE_FILE} up server --no-start
echo "Starting DB..."
docker-compose -f ${DOCKER_COMPOSE_FILE} start db

# Tests have been flaky in CI, probably due to the DB not being ready
# even if the server is running. In other projects, a 4-second sleep
# safely give the DB time to get ready for input.
sleep 4

# Need to create test DB separately because TypeORM won't do it for us
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "CREATE DATABASE test_${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -c test

EXIT_CODE=$?

if [ ${EXIT_CODE} == 0 ]
then
  docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server yarn test:integration

  EXIT_CODE=$?
fi

# TEST CLEANUP
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "DROP DATABASE IF EXISTS test_${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
export NODE_ENV=${DEFAULT_NODE_ENV}
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

exit ${EXIT_CODE}
