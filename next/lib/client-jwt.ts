import { getSession } from 'next-auth/react';

export async function getClientUserJwt() {
  const session = await getSession();

  return session?.jwt;
}
