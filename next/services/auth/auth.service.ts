import type { z } from 'zod';

import { env } from '@/env.mjs';
import type { userAuthSchema } from '@/lib/validations/auth';

type UserAuthForm = z.infer<typeof userAuthSchema>;

export const AuthService = {
  register(credentials: UserAuthForm) {
    return fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials?.email,
        username: credentials?.email.split('@')[0],
        password: credentials?.password
      })
    });
  },
  async login(credentials: Record<'email' | 'password', string> | undefined) {
    const response = await fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local?populate=image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: credentials?.email,
        password: credentials?.password
      })
    });

    return response.json();
  }
};
