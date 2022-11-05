import { Room } from '../../rooms/rooms.entity';
import { Screening } from '../../screenings/screening.entity';

export class CreateScreeningRoomDto {
  room: Room;
  screening: Screening;
}
