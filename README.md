# productscatalog

## Setup

- Create an env file:
  - `mv .env.example .env`
  - Generate an `APP_KEY` value of random characters
- `docker-compose up --build`

## Running the app

- `docker-compose up` (add `-d` if you want to run it in the background)
- Open the browser to `localhost:3333`

## Deployment

- Heroku requires the following config vars for the app to run:
  - `APP_KEY`
  - `ENV_SILENT=true` (for some reason we can't get it to work via `heroku.yml`)
- While on `master` in ther terminal, run `git push heroku master`
