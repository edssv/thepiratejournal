import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
