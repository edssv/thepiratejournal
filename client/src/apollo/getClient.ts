import { ApolloClient, InMemoryCache, from } from '@apollo/client';

import authLink from './authLink';
import errorLink from './errorLink';
import httpLink from './httpLink';

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: typeof window === 'undefined'
    });
  }

  return client;
};
