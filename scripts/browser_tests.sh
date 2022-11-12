#!/bin/bash

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"
DEFAULT_NODE_ENV=${NODE_ENV:-""}
export NODE_ENV=test
DEFAULT_DB_NAME=${DB_NAME:-""}
export DB_NAME=test_${DB_NAME}

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
docker-compose -f ${DOCKER_COMPOSE_FILE} pull db
echo "Creating Docker containers..."
docker-compose -f ${DOCKER_COMPOSE_FILE} up --no-start
echo "Starting DB..."
docker-compose -f ${DOCKER_COMPOSE_FILE} start db

# Need to create test DB separately because TypeORM won't do it for us
./scripts/wait-for-it.sh "http://localhost:8080/health?ready=1" -- \
  docker-compose exec db cockroach sql --execute "CREATE DATABASE IF NOT EXISTS ${DB_NAME};" --insecure

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -c test

#### SEED TEST DB ####
echo "Seeding database..."
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  server yarn run ts-node test/fixtures/seed_db.ts

EXIT_CODE=0

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:catalog || EXIT_CODE=1
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npm run run:admin || EXIT_CODE=1

#### TEST CLEANUP ####
docker-compose exec db cockroach sql --execute "DROP DATABASE IF EXISTS ${DB_NAME};" --insecure

docker-compose -f ${DOCKER_COMPOSE_FILE} stop
export NODE_ENV=${DEFAULT_NODE_ENV}
export DB_NAME=${DEFAULT_DB_NAME}
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

exit ${EXIT_CODE}
