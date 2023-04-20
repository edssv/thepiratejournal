import { createHttpLink } from '@apollo/client';

const ssrHttpLink = createHttpLink({
  uri: typeof window === `undefined` ? process.env.NEXT_PUBLIC_GRAPHQL_URL : '/graphql',
});

export default ssrHttpLink;
