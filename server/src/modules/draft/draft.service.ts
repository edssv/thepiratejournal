import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { Draft } from './entities/draft.entity';

@Injectable()
export class DraftService {
    constructor(
        @InjectRepository(Draft)
        private repository: Repository<Draft>
    ) {}

    create(userId: number, createDraftDto: CreateDraftDto) {
        return this.repository.save({ user: { id: userId }, ...createDraftDto });
    }

    findAll() {
        return `This action returns all draft`;
    }

    findOne(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    update(id: number, updateDraftDto: UpdateDraftDto) {
        return this.repository.update(id, updateDraftDto);
    }

    remove(id: number) {
        return this.repository.softDelete(id);
    }
}
