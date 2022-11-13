import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScreeningRoom } from './screening-room.entity';
import { CreateScreeningRoomDto } from './dto/create-screening-room.dto';
import { ReserveSeatDto } from '../seats/dto/reserve-seat.dto';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ScreeningRoom)
    private readonly screeningRoomRepository: Repository<ScreeningRoom>,
    private readonly seatsService: SeatsService,
  ) {}

  async createScreeningRoom(
    createScreeningRoomDto: CreateScreeningRoomDto,
  ): Promise<ScreeningRoom> {
    const screeningRoom = new ScreeningRoom();
    screeningRoom.room = createScreeningRoomDto.room;
    screeningRoom.screening = createScreeningRoomDto.screening;
    screeningRoom.reservedSeats = [];
    screeningRoom.takenSeats = [];

    return this.screeningRoomRepository.save(screeningRoom);
  }

  async getScreeningRoom(screeningId: number): Promise<ScreeningRoom> {
    return this.screeningRoomRepository.findOne({
      where: { screening: { id: screeningId } },
      relations: { room: true, screening: true },
    });
  }

  async startReservation(startReservationDto: ReserveSeatDto) {
    //TODO: Add new reservation to DB
    return this.seatsService.reserveSeats(startReservationDto);
  }

  async finishReservation(finishReservationDto: ReserveSeatDto) {
    //TODO: Change status of reservation, add info about payment, generate and send tickets
    return this.seatsService.takeSeats(finishReservationDto);
  }
}
