import ApolloClient, { InMemoryCache } from 'apollo-boost';
import store from 'store/dist/store.modern';

const cache = new InMemoryCache({
  typePolicies: {
    Organization: {
      fields: {
        grantsFunded: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },
        grantsReceived: {
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          }
        }
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
