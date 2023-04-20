import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: typeof window === `undefined` ? process.env.NEXT_PUBLIC_GRAPHQL_URL : '/graphql',
});

export default httpLink;
