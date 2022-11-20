import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';
import { ReserveSeatDto } from '../seats/dto/reserve-seat.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('/screening-room/:screeningId')
  getScreeningRoom(
    @Param('screeningId', ParseIntPipe) screeningId: number,
  ): Promise<ScreeningRoom> {
    return this.reservationsService.getScreeningRoom(screeningId);
  }

  @Post('/start')
  startReservation(@Body() startReservationDto: ReserveSeatDto) {
    console.log(startReservationDto);
    return this.reservationsService.startReservation(startReservationDto);
  }

  @Post('/finish')
  finishReservation(@Body() finishReservationDto: ReserveSeatDto) {
    return this.reservationsService.finishReservation(finishReservationDto);
  }
}
