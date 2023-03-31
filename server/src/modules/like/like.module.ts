import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { ArticleModule } from 'src/modules/article/article.module';

@Module({
    imports: [TypeOrmModule.forFeature([Like]), ArticleModule],
    controllers: [LikeController],
    providers: [LikeService],
})
export class LikeModule {}
