import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default (options = {}, apiUrl) => {
  return new ApolloClient({
    link: new HttpLink({ uri: 'https://gnl-graphql.herokuapp.com' }),
    cache: new InMemoryCache(),
  });
};
