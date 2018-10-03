import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

export default options =>
  new ApolloClient({
    link: createHttpLink({
      uri: `${process.env.API_URL || 'http://detroitledger.org:8081'}/graphql`,
    }),
  });
