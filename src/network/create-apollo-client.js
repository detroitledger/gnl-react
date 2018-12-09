import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

export default (options = {}, apiUrl) => {
  const cache = new InMemoryCache();
  if (typeof window !== 'undefined') {
    cache.restore(window.__APOLLO_STATE__);
  }
  return new ApolloClient({
    ssrMode: options.ssrMode,
    link: createHttpLink({
      uri: apiUrl || window.config.apiUrl,
    }),
    cache,
  });
};
