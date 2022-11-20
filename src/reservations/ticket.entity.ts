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
import { Reservation } from './reservation.entity';

export enum TicketStatus {
  NOT_SET,
  RESERVED,
  TAKEN,
}

export enum TicketType {
  NOT_SET,
  ADULT,
  KID,
  OLD,
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Screening)
  @JoinColumn()
  screening: Screening;

  @ManyToOne(() => Reservation)
  @JoinColumn()
  reservation: Reservation;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.NOT_SET })
  status: TicketStatus;

  @Column({ type: 'enum', enum: TicketType, default: TicketType.NOT_SET })
  type: TicketType;

  @Column('text')
  seat: string;
}
