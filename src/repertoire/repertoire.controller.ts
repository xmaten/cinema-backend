import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { RepertoireService } from './repertoire.service';
import { Repertoire } from './repertoire.entity';

@Controller('repertoire')
export class RepertoireController {
  constructor(private readonly repertoireService: RepertoireService) {}

  @Post()
  create(
    @Body() createRepertoireDto: CreateRepertoireDto,
  ): Promise<Repertoire> {
    return this.repertoireService.create(createRepertoireDto);
  }

  @Get()
  findAll(): Promise<Repertoire[]> {
    return this.repertoireService.findAll();
  }

  @Get(':date')
  findByDate(@Param('date') date: string): Promise<Repertoire> {
    return this.repertoireService.findByDate(date);
  }
}
