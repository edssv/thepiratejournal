import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('drafts')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createDraftDto: CreateDraftDto) {
    return this.draftService.create(req.user.id, createDraftDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.draftService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.draftService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftService.update(+id, updateDraftDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.draftService.remove(+id);
  }
}
