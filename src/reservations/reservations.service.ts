import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScreeningRoom } from './screening-room.entity';
import { CreateScreeningRoomDto } from './dto/create-screening-room.dto';
import { ReserveSeatDto } from '../seats/dto/reserve-seat.dto';
import { SeatsService } from '../seats/seats.service';
import { Reservation, ReservationStatus } from './reservation.entity';
import { Ticket, TicketStatus, TicketType } from './ticket.entity';
import { UpdateTicketsDto } from './dto/update-tickets.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly seatsService: SeatsService,
    @InjectRepository(ScreeningRoom)
    private readonly screeningRoomRepository: Repository<ScreeningRoom>,

    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
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
    const screeningRoom = await this.screeningRoomRepository.findOne({
      where: { id: startReservationDto.screeningRoomId },
      relations: {
        screening: true,
      },
    });

    await this.seatsService.reserveSeats(startReservationDto);
    const reservation = await this.reservationRepository.save({
      status: ReservationStatus.STARTED,
      screening: screeningRoom.screening,
    });

    await Promise.all(
      startReservationDto.seats.map(async (seat) => {
        return await this.ticketRepository.save({
          screening: screeningRoom.screening,
          reservation,
          status: TicketStatus.TAKEN,
          type: TicketType.ADULT,
          seat,
        });
      }),
    );

    return reservation;
  }

  async updateTickets(updateTicketsDto: UpdateTicketsDto) {
    // TODO: Currently where checks only for reservationId, I need to check for seat as well
    // OR in previous step (/start endpoint) I could return IDs of all tickets. Then on frontend connect these ids with given seats.
    // When I'm sending request to this service, I would send seat number as well as ticket ID so I know what to update

    await Promise.all(
      updateTicketsDto.selectedTickets.map(async (ticket) => {
        const result = await this.ticketRepository
          .createQueryBuilder()
          .update({
            seat: ticket.seat,
            type: Number(ticket.type),
          })
          .where({
            reservation: {
              id: updateTicketsDto.reservationId,
            },
          })
          .returning('*')
          .execute();

        return result.raw[0];
      }),
    );
  }

  async finishReservation(finishReservationDto: ReserveSeatDto) {
    //TODO: Change status of reservation, add info about payment, generate and send tickets
    return this.seatsService.takeSeats(finishReservationDto);
  }
}
