import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';

export default registerAs<AppConfig>('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  clientDomain: process.env.CLIENT_DOMAIN,
  serverDomain: process.env.SERVER_DOMAIN,
  dashboardDomain: process.env.DASHBOARD_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 5000,
  apiPrefix: process.env.API_PREFIX || 'api',
  assetsPrefix: process.env.ASSETS_PREFIX || 'assets',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  uploadFolder: process.env.UPLOAD_FOLDER,
}));
