import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScreeningRoom } from '../reservations/screening-room.entity';
import { CreateScreeningRoomDto } from '../reservations/dto/create-screening-room.dto';
import { ReserveSeatDto } from './dto/reserve-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(ScreeningRoom)
    private readonly screeningRoomRepository: Repository<ScreeningRoom>,
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

  async reserveSeat(reserveSeatDto: ReserveSeatDto): Promise<ScreeningRoom> {
    const screeningRoom = await this.screeningRoomRepository.findOne({
      where: {
        id: reserveSeatDto.screeningRoomId,
      },
      relations: {
        screening: true,
      },
    });

    const newReservedSeats = [
      ...screeningRoom.reservedSeats,
      reserveSeatDto.seat,
    ];

    return this.screeningRoomRepository.save({
      ...screeningRoom,
      reservedSeats: newReservedSeats,
    });
  }

  async takeSeat(takeSeatDto: ReserveSeatDto): Promise<ScreeningRoom> {
    const screeningRoom = await this.screeningRoomRepository.findOne({
      where: {
        id: takeSeatDto.screeningRoomId,
      },
      relations: {
        screening: true,
      },
    });

    const newReservedSeats = screeningRoom.reservedSeats.filter(
      (seat) => seat !== takeSeatDto.seat,
    );
    const newTakenSeats = [...screeningRoom.takenSeats, takeSeatDto.seat];

    return this.screeningRoomRepository.save({
      ...screeningRoom,
      reservedSeats: newReservedSeats,
      takenSeats: newTakenSeats,
    });
  }
}
