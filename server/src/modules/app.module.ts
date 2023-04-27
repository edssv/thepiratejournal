import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import appConfig from '../config/app.config';
import authConfig from '../config/auth.config';
import databaseConfig from '../config/database.config';
import fileConfig from '../config/file.config';
import googleConfig from '../config/google.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { ArticleModule } from './article/article.module';
import { BlogModule } from './blog/blog.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CommentModule } from './comment/comment.module';
import { DraftModule } from './draft/draft.module';
import { FileModule } from './file/file.module';
import { LikeModule } from './like/like.module';
import { FollowerModule } from './follower/follower.module';
import { MailConfigService } from './mail/mail-config.service';
import mailConfig from 'src/config/mail.config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, mailConfig, fileConfig, googleConfig],
      envFilePath: [`.env.${process.env.NODE_ENV || 'production'}`],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      driver: ApolloDriver,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
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
    MailModule,
  ],
})
export class AppModule {}
