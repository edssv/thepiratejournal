import { onError } from '@apollo/client/link/error';
import { getAccessToken } from '@/services/auth/auth.helper';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':
          // getNewTokens();
          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers;

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${getAccessToken()}`,
            },
          });

          // Retry the request, returning the new observable
          return forward(operation);
      }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export default errorLink;
