import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreeningService } from './screening.service';
import { ScreeningsController } from './screenings.controller';
import { Screening } from './screening.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screening])],
  providers: [ScreeningService],
  controllers: [ScreeningsController],
})
export class ScreeningsModule {}
