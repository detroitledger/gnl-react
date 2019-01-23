new detroitledger.org frontend

based on mtiger2k/react-redux-graphql-passport-starter and bnchdrff/react-redux-graphql-passport-starter

## Installation

```bash
yarn install --frozen-lockfile
```

## Configuration

`API_URL` points to the production server by default; to use a local dev server, either specify it as an env var or create a `config/local.toml` that contains `api_url = 'http://localhost:8081'`.

## Running Dev Server

```bash
yarn start
```

## Running in production

```bash
yarn build
yarn start-production
```

## Tests

```bash
yarn test
```

## Deploy

For Heroku deploy, set this config:

```
NPM_CONFIG_PRODUCTION=false
YARN_PRODUCTION=false
```

## Explore graphql

https://gnl-graphql.herokuapp.com

## Explanation

#### Client Side

Use react-apollo and apollo-client to fetch data via graphql api.

