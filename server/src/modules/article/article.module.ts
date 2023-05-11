import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { ArticleResolver } from './article.resolver';
import { DraftModule } from '../draft/draft.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), DraftModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
