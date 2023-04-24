import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';

import { DraftService } from './draft.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Draft } from './entities/draft.entity';
import { CreateDraftInput } from './inputs/create-draft.input';
import { UpdateDraftInput } from './inputs/update-draft.input';

@Resolver('Draft')
export class DraftResolver {
  constructor(private readonly draftService: DraftService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Draft)
  async createDraft(@Context() context, @Args('createDraftInput') createDraftInput: CreateDraftInput) {
    return await this.draftService.create(context.req.user.id, createDraftInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Draft)
  async getDraft(@Args('id') id: number) {
    return await this.draftService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async updateDraft(@Context() context, @Args('updateDraftInput') updateDraftInput: UpdateDraftInput) {
    return await this.draftService.update(updateDraftInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Draft)
  async removeDraft(@Args('id') id: number) {
    return await this.draftService.remove(id);
  }
}
