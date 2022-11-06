import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Screening } from '../screenings/screening.entity';
import { ScreeningRoom } from '../reservations/screening-room.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  numberOfRows: number;

  @Column()
  seatsInRow: number;

  @OneToMany(() => Screening, (screening) => screening)
  screenings: Screening[];

  @OneToMany(() => ScreeningRoom, (screeningRoom) => screeningRoom)
  screeningRooms: ScreeningRoom[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
