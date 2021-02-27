#!/bin/bash

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"

DEFAULT_NODE_ENV=${NODE_ENV:-""}

export NODE_ENV=test

docker-compose -f ${DOCKER_COMPOSE_FILE} pull db

echo "Creating Docker containers..."
docker-compose -f ${DOCKER_COMPOSE_FILE} up --no-start
echo "Starting DB..."
docker-compose -f ${DOCKER_COMPOSE_FILE} start db

sleep 4

# Need to create test DB separately because TypeORM won't do it for us
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "CREATE DATABASE test_${DB_NAME};"

sleep 1

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -c test

#### SEED TEST DB ####
echo "Seeding database..."
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  server yarn run ts-node test/fixtures/seed_db.ts

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
./scripts/wait-for-it.sh localhost:3000 -- echo "App ready"

sleep 1

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npx cypress run

EXIT_CODE=$?

#### TEST CLEANUP ####
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "DROP DATABASE IF EXISTS test_${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} stop

export NODE_ENV=${DEFAULT_NODE_ENV}

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

exit ${EXIT_CODE}
