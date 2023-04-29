import { createHttpLink } from '@apollo/client';

const SSR_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_CONTAINER_SERVER_DOMAIN}/${process.env.NEXT_PUBLIC_GRAPHQL_PREFIX}`;
const CLIENT_GRAPHQL_URL =
  process.env.NODE_ENV === 'production'
    ? `/${process.env.NEXT_PUBLIC_GRAPHQL_PREFIX}`
    : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${process.env.NEXT_PUBLIC_GRAPHQL_PREFIX}`;

const httpLink = createHttpLink({
  uri: typeof window === `undefined` ? SSR_GRAPHQL_URL : CLIENT_GRAPHQL_URL
});

export default httpLink;
