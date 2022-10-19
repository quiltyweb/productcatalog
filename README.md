# Product Catalog

![Test all the things](https://github.com/quiltyweb/productcatalog/workflows/Test%20all%20the%20things/badge.svg)
![Heroku](https://heroku-badge.herokuapp.com/?app=productcatalog)

## Setup

- Install Docker
- Install [`direnv`](https://direnv.net/)
  - Loads env vars from `.env`, which is convenient
- Install [`cockroachdb`](https://www.cockroachlabs.com/docs/stable/install-cockroachdb-mac.html)
- Create an env file:
  - `cp .env.example .env`
  - Set the uncommented env var values
- `docker volume create productcatalog_node_modules`
- `docker-compose up --build`

Optional:

- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (only necessary for deploying or dumping the prod DB)

### Database

- To set up or restore your local database using the production DB, run `./scripts/set_local_db_to_prod.sh [DUMP FILENAME]`
  - The dump filename is an optional arg that will use a local `*.sql` or `*.dump` file instead of downloading a new one from Heroku.
  - **WARNING:** This will erase any data you currently have on your local DB.

## Running the app

- `docker-compose up` (add `-d` if you want to run it in the background)
- Open the browser to `localhost:3000`

### GraphQL Playground

- Navigate to `localhost:3333/graphql`
- To make make authorized requests to the GraphQL API, you have to add `{"Authorization": "supersecretspicysauce"}` to the HTTP Headers section in the bottom left corner of the page.

## Deployment

We host the app on Heroku.

We deploy automatically to Heroku with every merged PR that passes CI via a GitHub integration. If you want to deploy manually do the following:

- While on `main`, run `git push heroku main:master`

## Testing

- Run all integration tests: `./scripts/integration_tests.sh`
  - Do not use `yarn run test:integration`, because all integration tests require a test DB, and the bash script takes care of setup and teardown.
- Run all unit tests: `docker-compose run --rm app yarn run test:unit`

## Troubleshooting

- To get code editor linters and other functionality working correctly, you have to install linting/testing/type packages locally as well as on your Docker container. This mostly works, but sometimes creates weird conflicts that require a reset per below.
- Sometimes you'll install packages, then get errors that say your new package is missing :expressionless:. The only thing that seems to fix it is to remove the `node_modules` volume and rebuild the image:
  - `docker container rm <container name>`
  - `docker volume rm <node_modules volume name>`
  - `docker volume create <node_modules volume name>`
  - `docker-compose build --no-cache`
