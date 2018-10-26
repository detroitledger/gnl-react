new detroitledger.org frontend

based on mtiger2k/react-redux-graphql-passport-starter and bnchdrff/react-redux-graphql-passport-starter

### Installation

```bash
yarn install --frozen-lockfile
cp .env.example .env # we don't have any secrets yet ;)
```

## Running Dev Server

```bash
yarn start
```

## Running in production

```bash
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

http://detroitledger.org:8081/graphiql

## Explanation

#### Client Side

Use react-apollo and apollo-client to fetch data via graphql api.

