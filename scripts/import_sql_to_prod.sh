#!/bin/bash

DB_FILEPATH=$1

cockroach sql --file ${DB_FILEPATH} --url ${PROD_DATABASE_URL}
