import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('/screening-room/:screeningId')
  getScreeningRoom(
    @Param('screeningId', ParseIntPipe) screeningId: number,
  ): Promise<ScreeningRoom> {
    return this.reservationsService.getScreeningRoom(screeningId);
  }
}
