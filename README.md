new detroitledger.org frontend

based on mtiger2k/react-redux-graphql-passport-starter and bnchdrff/react-redux-graphql-passport-starter

### Installation

```bash
npm install
cp .env.example .env # we don't have any secrets yet ;)
```

## Running Dev Server

```bash
npm start
```

## Building and Running Production Server

```bash
npm run build
# site is in dist now... go there & run `python -mSimpleHTTPServer` or whatever!
```

## Explanation

#### Client Side

Use react-apollo and apollo-client to fetch data via graphql api.
