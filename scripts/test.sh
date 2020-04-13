#!/bin/bash

DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

./scripts/wait-for-it.sh localhost:3000 -- echo "Server ready"

# Need to create test DB separately because TypeORM won't do it for us
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "CREATE DATABASE test_${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm app \
  yarn run migration:run -c test

EXIT_CODE=$?

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm app yarn test

if [ ${EXIT_CODE} == 0 ]
then
  EXIT_CODE=$?
fi

# TEST CLEANUP
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "DROP DATABASE IF EXISTS test_${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} stop

exit ${EXIT_CODE}
