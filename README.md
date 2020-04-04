new detroitledger.org frontend

based on mtiger2k/react-redux-graphql-passport-starter and bnchdrff/react-redux-graphql-passport-starter

## Installation

```bash
yarn install --frozen-lockfile
```

## Configuration

The env var `REACT_APP_API_URL` points to the production server by default.

The env var `REACT_APP_GOOGLE_CLIENT_ID` uses our prod google client id by default.

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
