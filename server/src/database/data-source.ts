import 'reflect-metadata';
import { Article } from 'src/modules/article/entities/article.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    dropSchema: false,
    keepConnectionAlive: true,
    logging: process.env.NODE_ENV !== 'production',
    // entities: [Article],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
    },
    extra: {
        max: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
        ssl:
            process.env.DATABASE_SSL_ENABLED === 'true'
                ? {
                      rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
                      ca: process.env.DATABASE_CA ?? undefined,
                      key: process.env.DATABASE_KEY ?? undefined,
                      cert: process.env.DATABASE_CERT ?? undefined,
                  }
                : undefined,
    },
} as DataSourceOptions);