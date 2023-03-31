import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private repository: Repository<Blog>
    ) {}

    create(user, createBlogDto: CreateBlogDto) {
        console.log(user);
        if (user.role === 'editor' || user.role === 'admin') {
            return this.repository.save({ user: { id: user.id }, ...createBlogDto });
        }

        throw new ForbiddenException('Нет доступа.');
    }

    findAll() {
        return this.repository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number) {
        await this.repository.increment({ id }, 'viewsCount', 1);

        const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

        if (!find) throw new NotFoundException('Статья не найдена');

        return find;
    }

    async update(id: number, userId: number, updateBlogDto: UpdateBlogDto) {
        const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

        if (!find) throw new NotFoundException('Статья не найдена');

        if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

        return this.repository.update(id, updateBlogDto);
    }

    async remove(id: number, userId: number) {
        const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

        if (!find) throw new NotFoundException('Статья не найдена');

        if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

        return this.repository.softDelete(id);
    }
}
