import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { SeatsService } from './seats.service';
import { ScreeningRoom } from '../screening-room.entity';
import { ReserveSeatDto } from './dto/reserve-seat.dto';

@Controller('reservations')
export class SeatsController {
  constructor(private readonly reservationsService: SeatsService) {}

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

  @Get('/screening-room/:screeningId')
  getSeats(
    @Param('screeningId', ParseIntPipe) screeningId: number,
  ): Promise<ScreeningRoom> {
    return this.reservationsService.getSeats(screeningId);
  }
}
