import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepertoireController } from './repertoire.controller';
import { RepertoireService } from './repertoire.service';
import { Repertoire } from './repertoire.entity';
import { Screening } from '../screenings/screening.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repertoire, Screening])],
  providers: [RepertoireService],
  controllers: [RepertoireController],
})
export class RepertoireModule {}
