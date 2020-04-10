#!/bin/bash

DB_FILE="${1:-product_catalog.sql}"

heroku pg:psql --app=${HEROKU_APP} < ${PWD}/database/backups/${DB_FILE}
