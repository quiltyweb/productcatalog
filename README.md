# Product Catalog

![Test all the things](https://github.com/quiltyweb/productcatalog/workflows/Test%20all%20the%20things/badge.svg)
![Heroku](https://heroku-badge.herokuapp.com/?app=productcatalog)

## Setup

- Install Docker
- Install [`direnv`](https://direnv.net/)
  - Loads env vars from `.env`, which is convenient
- Create an env file:
  - `cp .env.example .env`
  - Generate an `APP_KEY` value of random characters
- `docker-compose up --build`
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Database
- To set up or restore your local database using the production DB, run `./scripts/set_local_db_to_prod.sh [DUMP FILENAME]`
  - The dump filename is an optional arg that will use a local *.sql/*.dump file instead of downloading a new one from Heroku.

## Running the app

- `docker-compose up` (add `-d` if you want to run it in the background)
- Open the browser to `localhost:3333`

## Deployment

We host the app on Heroku. Heroku requires the following config vars for the app to run:
  - `APP_KEY`
  - `ENV_SILENT=true` (for some reason we can't get it to work via `heroku.yml`)

We deploy automatically to Heroku with every merged PR that passes CI via a GitHub integration. If you want to deploy manually do the following:
- While on `master`, run `git push heroku master`

## Notes

- We're on the bleeding edge of Adonis.js, so the default documentation is largely outdated. For relevant guides/docs, to go https://preview.adonisjs.com/guides/quick-start.
- The Adonis source code is broken up into a bunch of repos and can be difficult to navigate, but their specs can be a good source of basic examples when stuck:
https://github.com/adonisjs
