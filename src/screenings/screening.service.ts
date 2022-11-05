import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,
  ) {}

  async findAll(): Promise<Screening[]> {
    return this.screeningRepository.find();
  }

  async create(createScreeningDto: CreateScreeningDto): Promise<Screening> {
    return {} as Screening;
  }

  async findOne(id: number): Promise<Screening> {
    return this.screeningRepository.findOneBy({ id });
  }
}
