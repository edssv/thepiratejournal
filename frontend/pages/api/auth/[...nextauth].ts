import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { JWT as IJWT } from 'next-auth/jwt';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from '@/database/connectDB';

async function refreshAccessToken(tokenObject: IJWT) {
    try {
        const tokenResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/refresh', {
            refreshToken: tokenObject.refreshToken,
        });

        return {
            ...tokenObject,
            accessToken: tokenResponse.data.accessToken,
            accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
            refreshToken: tokenResponse.data.refreshToken,
        };
    } catch (error) {
        return {
            ...tokenObject,
            error: 'RefreshAccessTokenError',
        };
    }
}

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/login', {
                        username: credentials?.username,
                        password: credentials?.password,
                        email: credentials?.email,
                    });

                    if (response.data.accessToken) {
                        return response.data;
                    }

                    return null;
                } catch (e: any) {
                    console.log(e);
                    throw new Error(e);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            profile(profile: GoogleProfile) {
                return {
                    id: 'id',
                    username: profile.name,
                    email: profile.email,
                    emailVerified: profile.email_verified,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30, // 60 days

        async encode({ secret, token }) {
            debugger;
            console.log(token);
            return jwt.sign(token ?? '', secret);
        },
        async decode({ secret, token }) {
            return jwt.verify(token ?? '', secret);
        },
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user.user;
                token.accessToken = user.accessToken;
                token.accessTokenExpiry = user.accessTokenExpiry;
                token.refreshToken = user.refreshToken;
            }

            const shouldRefreshTime = Math.round(token.accessTokenExpiry - Date.now());

            if (shouldRefreshTime > 0) {
                return Promise.resolve(token);
            }

            token = refreshAccessToken(token);
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.accessTokenExpiry = token.accessTokenExpiry;
            session.error = token.error;

            return Promise.resolve(session);
        },
    },
};

export default NextAuth(authOptions);
