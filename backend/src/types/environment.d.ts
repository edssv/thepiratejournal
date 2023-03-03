export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            API_URL: string;
            CLIENT_URL: string;
            ADMIN_PANEL_URL: string;
            MONGODB_URI: string;
            DB_NAME: string;
        }
    }
}
