import ApolloClient from 'apollo-boost';
import store from 'store/dist/store.modern';

export default (apiUrl) => {
  return new ApolloClient({
    uri: apiUrl,
    request: (op) =>
      op.setContext({
        headers: {
          'X-Auth-Token': store.get('idToken'),
        },
      }),
  });
};
