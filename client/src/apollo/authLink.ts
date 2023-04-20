import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '@/services/auth/auth.helper';

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

export default authLink;
