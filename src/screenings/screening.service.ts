import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Screening } from './screening.entity';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/rooms.entity';
import { ReservationsService } from '../reservations/reservations.service';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    private readonly reservationsService: ReservationsService,
  ) {}

  async findAll(): Promise<Screening[]> {
    return this.screeningRepository.find();
  }

  async create(createScreeningDto: CreateScreeningDto): Promise<Screening> {
    const screening = new Screening();

    const movie = await this.movieRepository.findOneBy({
      id: createScreeningDto.movieId,
    });
    const room = await this.roomRepository.findOneBy({
      id: createScreeningDto.roomId,
    });

    screening.room = room;
    screening.movie = movie;
    screening.duration = createScreeningDto.duration;
    screening.startsAt = createScreeningDto.startsAt;

    const savedScreening = await this.screeningRepository.save(screening);

    await this.reservationsService.createScreeningRoom({
      screening: savedScreening,
      room,
    });

    return screening;
  }

  async findOne(id: number): Promise<Screening> {
    return this.screeningRepository.findOneBy({ id });
  }
}
