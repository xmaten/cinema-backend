import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';
import { ReserveSeatDto } from '../seats/dto/reserve-seat.dto';
import { UpdateTicketsDto } from './dto/update-tickets.dto';

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
    return this.reservationsService.startReservation(startReservationDto);
  }

  @Put('/tickets')
  updateTickets(@Body() updateTicketsDto: UpdateTicketsDto) {
    return this.reservationsService.updateTickets(updateTicketsDto);
  }

  @Post('/finish')
  finishReservation(@Body() finishReservationDto: ReserveSeatDto) {
    return this.reservationsService.finishReservation(finishReservationDto);
  }
}
