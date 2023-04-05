import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import fileConfig from './config/file.config';
import googleConfig from './config/google.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { ArticleModule } from './modules/article/article.module';
import { BlogModule } from './modules/blog/blog.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { CommentModule } from './modules/comment/comment.module';
import { DraftModule } from './modules/draft/draft.module';
import { FileModule } from './modules/file/file.module';
import { LikeModule } from './modules/like/like.module';
import { FollowerModule } from './modules/follower/follower.module';
import { Article } from './modules/article/entities/article.entity';
import { Blog } from './modules/blog/entities/blog.entity';
import { Bookmark } from './modules/bookmark/entities/bookmark.entity';
import { Comment } from './modules/comment/entities/comment.entity';
import { Draft } from './modules/draft/entities/draft.entity';
import { Follower } from './modules/follower/entities/follower.entity';
import { Like } from './modules/like/entities/like.entity';
import { User } from './modules/user/entities/user.entity';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'media'),
            serveRoot: `/assets`,
            exclude: [`/${process.env.API_PREFIX}/.*`],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig, authConfig, fileConfig, googleConfig],
            envFilePath: [`.env.${process.env.NODE_ENV || 'production'}`],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Article, Blog, Bookmark, Comment, Draft, Follower, Like, User],
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        }),
        ArticleModule,
        AuthModule,
        UserModule,
        CommentModule,
        FileModule,
        BlogModule,
        LikeModule,
        BookmarkModule,
        FollowerModule,
        AuthGoogleModule,
        DraftModule,
    ],
})
export class AppModule {}
