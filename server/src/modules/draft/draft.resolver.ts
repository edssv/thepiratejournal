import { Args, Resolver, Query } from '@nestjs/graphql';

import { DraftService } from './draft.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Draft } from './entities/draft.entity';

@Resolver('Draft')
export class DraftResolver {
  constructor(private readonly draftService: DraftService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Draft)
  async getDraft(@Args('id') id: number) {
    return await this.draftService.findOne(id);
  }
}
