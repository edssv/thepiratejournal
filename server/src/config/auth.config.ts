import { registerAs } from '@nestjs/config';
import { AuthConfig } from './config.type';

export default registerAs<AuthConfig>('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  refreshSecret: process.env.AUTH_JWT_REFRESH_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  refreshExpires: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
}));
