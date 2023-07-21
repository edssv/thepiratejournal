import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env.mjs';
import { AuthService } from '@/services/auth/auth.service';
import { UserService } from '@/services/user/user.service';

import { absoluteUrlImageFromStrapi } from './utils';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const data = await AuthService.login(credentials);

        if (data) {
          return { ...data, jwt: data.jwt, image: data.image ? absoluteUrlImageFromStrapi(data.image.url) : '' };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    })
  ],
  secret: env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session({ session, token }) {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.jwt = token.jwt;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async jwt({ account, token, user }) {
      const me = await UserService.getMe(token?.jwt);

      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (user.jwt) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          token.jwt = user.jwt;
          token.id = +user.id;
          token.name = user.name;
          token.picture = user.image ?? '';

          return token;
        }
        const data = await AuthService.callback(account?.provider, account?.access_token);

        token.jwt = data.jwt;
        token.id = data.user.id;
        token.name = data.user.username;

        return token;
      }

      if (me) {
        if (me.provider === 'local' && me.image?.url) {
          token.picture = absoluteUrlImageFromStrapi(me.image.url);
        }
      }

      token.id = me.id;
      token.name = me.username;
      token.email = me.email;

      return token;
    }
  }
};
