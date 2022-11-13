import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatsService } from './seats.service';
import { ScreeningRoom } from '../reservations/screening-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningRoom])],
  exports: [SeatsService],
  providers: [SeatsService],
  controllers: [],
})
export class SeatsModule {}
