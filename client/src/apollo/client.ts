import { ApolloClient, InMemoryCache } from '@apollo/client';

import { getAccessToken } from '@/services/auth/auth.helper';

const accessToken = getAccessToken();

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: { authorization: accessToken ? `Bearer ${accessToken}` : '' },
});

export default apolloClient;
