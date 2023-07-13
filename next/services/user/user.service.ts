import { getSession } from 'next-auth/react';

import { env } from '@/env.mjs';
import { getClientUserJwt } from '@/lib/client-jwt';

export const UserService = {
  async update(data: any) {
    const jwt = await getClientUserJwt();
    const session = await getSession();

    return fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/users/${session?.user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${jwt}`
      },
      body: JSON.stringify(data)
    });
  },
  async getMe(jwt: any) {
    const res = await fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/users/me?populate=image`, {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    });

    return res.json();
  }
};
