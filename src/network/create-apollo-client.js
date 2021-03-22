import { ApolloClient, InMemoryCache } from '@apollo/client';

import store from 'store/dist/store.modern';

export default (apiUrl) => {
  return new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
    request: (op) =>
      op.setContext({
        headers: {
          'X-Auth-Token': store.get('idToken'),
        },
      }),
  });
};
