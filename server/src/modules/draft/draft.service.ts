import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './entities/draft.entity';
import { CreateDraftInput } from './inputs/create-draft.input';
import { UpdateDraftInput } from './inputs/update-draft.input';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private repository: Repository<Draft>,
  ) {}

  create(userId: number, createDraftInput: CreateDraftInput) {
    return this.repository.save({ user: { id: userId }, createDraftInput });
  }

  findAll() {
    return `This action returns all draft`;
  }

  findUserDrafts(userId: number) {
    return this.repository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(updateDraftInput: UpdateDraftInput) {
    const { draftId, ...draftData } = updateDraftInput;
    this.repository.update({ id: draftId }, draftData);
    return draftId;
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id)
      throw new ForbiddenException('Статья принадлежит другому пользователю.');

    this.repository.delete(id);

    return find;
  }
}
