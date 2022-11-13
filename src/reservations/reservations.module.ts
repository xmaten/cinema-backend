import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';
import { SeatsService } from '../seats/seats.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningRoom])],
  exports: [ReservationsService],
  providers: [ReservationsService, SeatsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
