import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningRoom])],
  exports: [ReservationsService],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
