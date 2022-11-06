import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Screening } from '../screenings/screening.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class ScreeningRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Screening)
  @JoinColumn()
  screening: Screening;

  @ManyToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column('text', { array: true })
  reservedSeats: string[];

  @Column('text', { array: true })
  takenSeats: string[];

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
