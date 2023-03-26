import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { FileModule } from './file/file.module';
import authConfig from './config/auth.config';
import fileConfig from './config/file.config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'media'),
            serveRoot: '/assets',
            exclude: ['/api/(.*)'],
        }),
        ConfigModule.forRoot({ isGlobal: true, load: [configuration, fileConfig, authConfig] }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            entities: [Article, Comment, User],
            synchronize: process.env.NODE_ENV === 'development',
        }),
        ArticleModule,
        AuthModule,
        UserModule,
        CommentModule,
        FileModule,
    ],
})
export class AppModule {}
