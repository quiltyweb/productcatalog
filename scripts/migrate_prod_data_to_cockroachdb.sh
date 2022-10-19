#!/bin/bash

set -euo pipefail

DB_FILE=prod_dump_`date +%Y-%m-%d"_"%H_%M_%S`
DB_PATH=database/backups/${DB_FILE}

heroku pg:backups:capture --app=${HEROKU_APP}
heroku pg:backups:download --app=${HEROKU_APP} --output=${DB_PATH}.dump
# Overwrite Heroku's custom format with plain-text SQL
pg_restore --no-owner -f ${DB_PATH}.sql ${DB_PATH}.dump
rm ${DB_PATH}.dump

DB_PATH=${DB_PATH}.sql

source scripts/import_sql_to_prod.sh ${DB_PATH}
