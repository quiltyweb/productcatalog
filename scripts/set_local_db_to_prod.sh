#!/bin/bash

set -euo pipefail

FILE_ARG=${1:-""}

docker-compose rm -s -v db
docker-compose up -d db

# Not ideal, but wait-for-it was listening for the port to be ready, but that
# wasn't enough time for the DB to be ready to accept commands,
# so we're sleeping instead
sleep 10

if [ -z ${FILE_ARG} ]
then
  BUCKET_URL="s3://product-catalog-backups?AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}&AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}&AWS_REGION=syd1&AWS_ENDPOINT=https://syd1.digitaloceanspaces.com"
  cockroach sql --url ${PROD_DATABASE_URL} --execute "BACKUP DATABASE ${DB_NAME} INTO '${BUCKET_URL}'"

  docker-compose exec db \
    cockroach sql --execute "DROP DATABASE IF EXISTS ${DB_NAME}" --insecure
  docker-compose exec db \
    cockroach sql --execute "RESTORE DATABASE ${DB_NAME} FROM LATEST IN '${BUCKET_URL}'" --insecure
else
  DB_FILE=${FILE_ARG}
  DB_PATH=database/backups/${DB_FILE}

  docker-compose exec db \
    cockroach sql --execute "CREATE DATABASE IF NOT EXISTS ${DB_NAME};" --insecure
  docker-compose exec db \
    cockroach sql --file ${DB_PATH} --insecure
fi
