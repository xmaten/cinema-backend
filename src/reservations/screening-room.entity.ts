import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Screening } from '../screenings/screening.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class ScreeningRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Screening)
  @JoinColumn()
  screening: Screening;

  @OneToOne(() => Room)
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
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
