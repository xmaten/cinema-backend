import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/rooms.entity';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Screening[]> {
    return this.screeningRepository.find();
  }

  async create(createScreeningDto: CreateScreeningDto): Promise<Screening> {
    const screening = new Screening();
    screening.movie = await this.movieRepository.findOneBy({
      id: createScreeningDto.movieId,
    });
    screening.room = await this.roomRepository.findOneBy({
      id: createScreeningDto.roomId,
    });
    screening.duration = createScreeningDto.duration;
    screening.startsAt = createScreeningDto.startsAt;

    return this.screeningRepository.save(screening);
  }

  async findOne(id: number): Promise<Screening> {
    return this.screeningRepository.findOneBy({ id });
  }
}
