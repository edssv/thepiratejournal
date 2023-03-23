import DatabaseConfig from './database.config';
export default () => ({
    environment: process.env.NODE_ENVIRONMENT ? process.env.NODE_ENVIRONMENT : 'development',
    port: 3000,
    database: {
        ...DatabaseConfig(),
    },
});
