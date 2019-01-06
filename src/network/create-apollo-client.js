import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default (apiUrl) => {
  return new ApolloClient({
    link: new HttpLink({ uri: apiUrl }),
    cache: new InMemoryCache(),
  });
};
