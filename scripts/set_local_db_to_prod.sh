#!/bin/bash


set -euo pipefail

FILE_ARG=${1:-""}

if [ -z ${FILE_ARG} ]
then
  DB_FILE=prod_dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
  DB_PATH=${PWD}/database/backups/${DB_FILE}

  heroku pg:backups:capture --app=${HEROKU_APP}
  heroku pg:backups:download --app=${HEROKU_APP} --output=${DB_PATH}
else
  DB_FILE=${FILE_ARG}
  DB_PATH=${PWD}/database/backups/${DB_FILE}
fi

docker-compose rm -s -v db
docker-compose up -d db

# Not ideal, but wait-for-it was listening for the port to be ready, but that
# wasn't enough time for the DB to be ready to accept commands,
# so we're sleeping instead
sleep 4

cat ${DB_PATH} \
  | docker exec -i productcatalog_db_1 pg_restore \
    -U postgres -d ${DB_NAME} --verbose --no-owner
