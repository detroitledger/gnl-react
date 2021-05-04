import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import store from 'store/dist/store.modern';

export default (apiUrl) => {
  const httpLink = new HttpLink({
    uri: apiUrl,
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = store.get('idToken');

    operation.setContext({
      headers: {
        'X-Auth-Token': token ? token : '',
      },
    });

    return forward(operation);
  });

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

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};
