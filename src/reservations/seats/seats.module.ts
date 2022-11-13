import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { ScreeningRoom } from '../screening-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningRoom])],
  exports: [SeatsService],
  providers: [SeatsService],
  controllers: [SeatsController],
})
export class SeatsModule {}
