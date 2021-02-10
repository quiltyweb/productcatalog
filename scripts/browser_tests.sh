#!/bin/bash

#### SETUP ####
DOCKER_COMPOSE_FILE="${1:-docker-compose.yml}"

DEFAULT_NODE_ENV=${NODE_ENV}

export NODE_ENV=test

# There's probably a better way to do this, but we change the default DB name
# to test_$DATABASE_NAME, which the app will then use as the default DB
# for the browser tests. This follows Django's naming convention for test DBs.
DEFAULT_DATABASE_NAME=${DB_NAME}

export DB_NAME="test_${DEFAULT_DATABASE_NAME}"

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

./scripts/wait-for-it.sh localhost:3333 -- echo "Server ready"

# Tests have been flaky in CI, probably due to the DB not being ready
# even if the server is running. In other projects, a 4-second sleep
# safely give the DB time to get ready for input.
sleep 4

# Need to create test DB separately because TypeORM won't do it for us
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "CREATE DATABASE ${DB_NAME};"

sleep 1

docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm server \
  yarn run migration:run -c test

EXIT_CODE=$?

if [ ${EXIT_CODE} != 0 ]
then
  # Need to stop before exiting to reset to non-test env vars
  docker-compose -f ${DOCKER_COMPOSE_FILE} stop

  export NODE_ENV=${DEFAULT_NODE_ENV}

  docker-compose up -d

  exit ${EXIT_CODE}
fi

#### SEED TEST DB ####
# TODO:
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
   server ts-node server/tests/fixtures/seed_db.ts

# We manually manage exit codes rather than using pipefail, because we want
# to be sure to stop docker-compose before exiting.
EXIT_CODE=$?


if [ ${EXIT_CODE} != 0 ]
then
  # Need to stop before exiting to reset to non-test env vars
  docker-compose -f ${DOCKER_COMPOSE_FILE} stop

  export NODE_ENV=${DEFAULT_NODE_ENV}

  docker-compose up -d

  exit ${EXIT_CODE}
fi

#### RUN TESTS ####
docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
  browser_test npx cypress run

EXIT_CODE=$?

# TEST CLEANUP
docker exec -t -u postgres productcatalog_db_1 \
  psql --command "DROP DATABASE IF EXISTS ${DB_NAME};"

docker-compose -f ${DOCKER_COMPOSE_FILE} stop

export NODE_ENV=${DEFAULT_NODE_ENV}
export DB_NAME=${DEFAULT_DATABASE_NAME}

docker-compose up -d
