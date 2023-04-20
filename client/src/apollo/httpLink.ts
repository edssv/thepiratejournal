import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: typeof window === `undefined` ? process.env.GRAPHQL_URL : process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export default httpLink;
