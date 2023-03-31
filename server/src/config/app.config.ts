import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    workingDirectory: process.env.PWD || process.cwd(),
    clientUrl: process.env.CLIENT_URL,
    clientDomain: process.env.CLIENT_DOMAIN,
    apiUrl: process.env.API_URL,
    apiDomain: process.env.API_DOMAIN,
    controlUrl: process.env.CONTROL_URL,
    port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 5000,
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
}));
