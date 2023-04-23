import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './entities/draft.entity';
import { CreateDraftInput } from './inputs/create-draft.input';
import { UpdateDraftInput } from './inputs/update-draft.input';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private repository: Repository<Draft>
  ) {}

  create(userId: number, createDraftInput: CreateDraftInput) {
    return this.repository.save({ user: { id: userId }, createDraftInput });
  }

  findAll() {
    return `This action returns all draft`;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(updateDraftInput: UpdateDraftInput) {
    const { id, ...draftData } = updateDraftInput;
    return this.repository.update(id, draftData);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
