import { ApolloClient, InMemoryCache, from } from '@apollo/client';

import errorLink from './errorLink';
import authLink from './authLink';
import httpLink from './httpLink';

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  ssrMode: typeof window === 'undefined',
});

export default apolloClient;
