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

export enum ReservationStatus {
  NOT_SET,
  STARTED,
  PAID,
  DECLINED,
  REMOVED,
}

@Entity()
export class Reservation {
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

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.NOT_SET,
  })
  status: ReservationStatus;
}
