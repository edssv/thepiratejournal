import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { DraftService } from '../draft/draft.service';
import { CreateBlogInput } from './inputs/create-blog.input';
import { UpdateBlogInput } from './inputs/update-blog.input';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private repository: Repository<Blog>,
    private readonly draftService: DraftService
  ) {}

  create(user, createBlogInput: CreateBlogInput) {
    if (user.role === 'user') {
      throw new ForbiddenException('Нет доступа.');
    }

    const blog = this.repository.save({
      user: { id: user.id },
      title: createBlogInput.title,
      searchTitle: createBlogInput.title.toLowerCase(),
      description: createBlogInput.description,
      cover: createBlogInput.cover,
      body: createBlogInput.body,
      tags: createBlogInput.tags,
      category: createBlogInput.category,
      readingTime: createBlogInput.readingTime,
    });

    if (createBlogInput.draftId) {
      this.draftService.remove(createBlogInput.draftId);
    }

    return blog;
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

  async update(userId: number, updateBlogInput: UpdateBlogInput) {
    const { id, ...blogData } = updateBlogInput;

    const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    this.repository.update(id, {
      title: blogData.title,
      description: blogData.description,
      cover: blogData.cover,
      body: blogData.body,
      tags: blogData.tags,
      category: blogData.category,
      readingTime: blogData.readingTime,
    });

    return this.repository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    return this.repository.softDelete(id);
  }

  async findNext(id: number) {
    return await this.repository.find({ where: { id: Not(id) }, take: 3 });
  }
}
