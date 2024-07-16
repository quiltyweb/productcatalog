#!/bin/bash

# set -euo pipefail

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.ci.yml}"
EXIT_CODE=0

trap log_errors err
trap clean_up exit

function log_errors() {
  docker-compose -f ${DOCKER_COMPOSE_FILE} ps
  docker-compose -f ${DOCKER_COMPOSE_FILE} logs
  EXIT_CODE=1
}

function clean_up() {
  docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db cockroach sql --execute "DROP DATABASE IF EXISTS test;" --insecure

  exit ${EXIT_CODE}
}

# Need to create test DB separately because TypeORM won't do it for us
docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db cockroach sql --execute "CREATE DATABASE IF NOT EXISTS test;" --insecure

docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T server \
  yarn run migration:run -d src/dataSource.ts

#### SEED TEST DB ####
echo "Seeding database..."
docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T \
  server yarn run ts-node test/fixtures/seed_db.ts

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:catalog
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:admin
