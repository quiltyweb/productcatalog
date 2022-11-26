#!/bin/bash

set -euo pipefail

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"
DEFAULT_NODE_ENV=${NODE_ENV:-""}
export NODE_ENV=test
DEFAULT_DB_NAME=${DB_NAME:-""}
export DB_NAME=test_${DB_NAME}
EXIT_CODE=0

trap clean_up err exit

function clean_up() {
  docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db cockroach sql --execute "DROP DATABASE IF EXISTS ${DB_NAME};" --insecure

  docker-compose -f ${DOCKER_COMPOSE_FILE} stop
  export NODE_ENV=${DEFAULT_NODE_ENV}
  export DB_NAME=${DEFAULT_DB_NAME}
  docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

  exit ${EXIT_CODE}
}

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
docker-compose -f ${DOCKER_COMPOSE_FILE} pull db
docker-compose -f ${DOCKER_COMPOSE_FILE} up --no-start
docker-compose -f ${DOCKER_COMPOSE_FILE} start db

# --retry-all-errors is available in a version of curl that isn't available
# in the latest version of Ubuntu yet, so we sleep till we can use it in CI.
sleep 10

# Need to create test DB separately because TypeORM won't do it for us
docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db cockroach sql --execute "CREATE DATABASE IF NOT EXISTS ${DB_NAME};" --insecure

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -d src/dataSource.ts

#### SEED TEST DB ####
echo "Seeding database..."
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  server yarn run ts-node test/fixtures/seed_db.ts

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:catalog || EXIT_CODE=1
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:admin || EXIT_CODE=1
