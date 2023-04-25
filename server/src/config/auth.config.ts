import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  refreshSecret: process.env.AUTH_JWT_REFRESH_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  refreshExpires: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
}));
