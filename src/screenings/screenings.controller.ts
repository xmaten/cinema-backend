import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ScreeningService } from './screening.service';
import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';

@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningService: ScreeningService) {}

  @Get()
  findAll(): Promise<Screening[]> {
    return this.screeningService.findAll();
  }

  @Post()
  create(@Body() createScreeningDto: CreateScreeningDto): Promise<Screening> {
    return this.screeningService.create(createScreeningDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Screening> {
    return this.screeningService.findOne(id);
  }
}
