import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreeningService } from './screening.service';
import { ScreeningsController } from './screenings.controller';
import { Screening } from './screening.entity';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screening, Movie, Room])],
  providers: [ScreeningService],
  controllers: [ScreeningsController],
})
export class ScreeningsModule {}
