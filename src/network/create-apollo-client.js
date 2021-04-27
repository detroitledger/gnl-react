import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import store from 'store/dist/store.modern';

const cache = new InMemoryCache({
  typePolicies: {
    Organization: {
      fields: {
        grantsFunded: offsetLimitPagination(),
        grantsReceived: offsetLimitPagination(),
      },
    },
  },
});

export default (apiUrl) => {
  return new ApolloClient({
    uri: apiUrl,
    cache: cache,
    request: (op) =>
      op.setContext({
        headers: {
          'X-Auth-Token': store.get('idToken'),
        },
      }),
  });
};
