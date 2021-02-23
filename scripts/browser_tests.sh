#!/bin/bash

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"

DEFAULT_NODE_ENV=${NODE_ENV}

export NODE_ENV=test

docker-compose -f ${DOCKER_COMPOSE_FILE} pull db

docker-compose -f ${DOCKER_COMPOSE_FILE} up --no-start

# Need to create test DB separately because TypeORM won't do it for us
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "CREATE DATABASE test_${DB_NAME};"
# docker exec -t -u postgres productcatalog_db_1 psql --command "CREATE DATABASE test_product_catalog;"


sleep 1

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -c test
# docker-compose -f docker-compose.ci.yml run --rm server yarn run migration:run -c test

#### SEED TEST DB ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  server yarn run ts-node test/fixtures/seed_db.ts
# docker-compose -f docker-compose.ci.yml run --rm server yarn run ts-node test/fixtures/seed_db.ts

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
# docker-compose -f docker-compose.ci.yml up -d

./scripts/wait-for-it.sh localhost:3000 -- echo "App ready"

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npx cypress run
# docker-compose -f docker-compose.ci.yml run --rm browser_test npx cypress run

EXIT_CODE=$?

# # TEST CLEANUP
# docker exec -t -u postgres productcatalog_db_1 \
#   psql --command "DROP DATABASE IF EXISTS test_${DB_NAME};"

# docker-compose -f ${DOCKER_COMPOSE_FILE} stop

# export NODE_ENV=${DEFAULT_NODE_ENV}

# docker-compose up -d

# exit ${EXIT_CODE}