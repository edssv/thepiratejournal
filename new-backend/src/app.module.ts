import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DataSource } from 'typeorm';
import { join } from 'path';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import fileConfig from './config/file.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { Article } from './article/entities/article.entity';
import { User } from './user/entities/user.entity';
import { Comment } from './comment/entities/comment.entity';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entities/blog.entity';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'media'),
            serveRoot: '/assets',
            exclude: ['/api/(.*)'],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig, fileConfig, authConfig],
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Article, Blog, Comment, User],
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        }),
        ArticleModule,
        AuthModule,
        UserModule,
        CommentModule,
        FileModule,
        BlogModule,
    ],
})
export class AppModule {}
