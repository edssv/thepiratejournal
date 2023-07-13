import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

export async function getServerUserJwt() {
  const session = await getServerSession(authOptions);

  return session?.jwt;
}
