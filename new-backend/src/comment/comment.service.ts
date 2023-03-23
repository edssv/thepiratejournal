import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private repository: Repository<Comment>
    ) {}

    create(createCommentDto: CreateCommentDto) {
        return this.repository.save({
            body: createCommentDto.body,
            user: { id: 6 },
            article: { id: createCommentDto.articleId },
        });
    }

    findAll() {
        return this.repository.find();
    }

    findOne(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async update(id: number, updateCommentDto: UpdateCommentDto) {
        const find = await this.repository.findOne({ where: { id } });

        if (!find) throw new NotFoundException('Комментарий не найден');

        return this.repository.update(id, updateCommentDto);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }
}
