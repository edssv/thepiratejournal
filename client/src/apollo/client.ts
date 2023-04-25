import { ApolloClient, InMemoryCache, from } from '@apollo/client';

import authLink from './authLink';
import httpLink from './httpLink';

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: typeof window === 'undefined',

    typePolicies: {
      Article: {
        fields: {
          cover: {
            merge(existing, incoming) {
              if (!process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN) return null;

              return (
                process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN +
                '/' +
                process.env.NEXT_PUBLIC_ASSETS_PREFIX +
                incoming.split(`/${process.env.NEXT_PUBLIC_ASSETS_PREFIX}`)[1]
              );
            },
          },
        },
      },
      Blog: {
        fields: {
          cover: {
            merge(existing, incoming) {
              if (!process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN) return null;

              return (
                process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN +
                '/' +
                process.env.NEXT_PUBLIC_ASSETS_PREFIX +
                incoming.split(`/${process.env.NEXT_PUBLIC_ASSETS_PREFIX}`)[1]
              );
            },
          },
        },
      },
    },
  }),
  ssrMode: typeof window === 'undefined',
});

export default apolloClient;
