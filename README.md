# Product Catalog

![Test all the things](https://github.com/quiltyweb/productcatalog/workflows/Test%20all%20the%20things/badge.svg)
![Heroku](https://heroku-badge.herokuapp.com/?app=productcatalog)

## Setup

- Create an env file:
  - `mv .env.example .env`
  - Generate an `APP_KEY` value of random characters
- `docker-compose up --build`

## Running the app

- `docker-compose up` (add `-d` if you want to run it in the background)
- Open the browser to `localhost:3333`

## Deployment

We host the app on Heroku. Heroku requires the following config vars for the app to run:
  - `APP_KEY`
  - `ENV_SILENT=true` (for some reason we can't get it to work via `heroku.yml`)

We deploy automatically to Heroku with every merged PR that passes CI via a GitHub integration. If you want to deploy manually do the following:
- While on `master`, run `git push heroku master`
