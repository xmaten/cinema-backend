import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { ScreeningRoom } from './screening-room.entity';
import { ReserveSeatDto } from './dto/reserve-seat.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Put('/reserve-seat/:screeningRoomId')
  reserveSeat(
    @Param('screeningRoomId', ParseIntPipe) screeningRoomId: number,
    @Body() reserveSeatDto: ReserveSeatDto,
  ): Promise<ScreeningRoom> {
    return this.reservationsService.reserveSeat({
      seat: reserveSeatDto.seat,
      screeningRoomId,
    });
  }

  @Put('/take-seat/:screeningRoomId')
  takeSeat(
    @Param('screeningRoomId', ParseIntPipe) screeningRoomId: number,
    @Body() reserveSeatDto: ReserveSeatDto,
  ): Promise<ScreeningRoom> {
    return this.reservationsService.takeSeat({
      seat: reserveSeatDto.seat,
      screeningRoomId,
    });
  }
}
