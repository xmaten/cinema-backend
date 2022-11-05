import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { Repertoire } from './repertoire.entity';
import { Screening } from '../screenings/screening.entity';

@Injectable()
export class RepertoireService {
  constructor(
    @InjectRepository(Repertoire)
    private readonly repertoireRepository: Repository<Repertoire>,

    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,
  ) {}

  async create(createRepertoireDto: CreateRepertoireDto): Promise<Repertoire> {
    const repertoire = new Repertoire();
    repertoire.date = createRepertoireDto.date.toString();
    repertoire.screenings = await Promise.all(
      createRepertoireDto.screeningsIds.map(
        async (id) => await this.screeningRepository.findOneBy({ id }),
      ),
    );

    return this.repertoireRepository.save(repertoire);
  }

  async findAll(): Promise<Repertoire[]> {
    return this.repertoireRepository.find({
      relations: { screenings: true },
    });
  }

  async findByDate(date: string): Promise<Repertoire> {
    return this.repertoireRepository.findOne({
      where: { date },
      relations: { screenings: true },
    });
  }
}
