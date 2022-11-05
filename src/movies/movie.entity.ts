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
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  description: string;

  @Column()
  posterUrl: string;

  @OneToMany(() => Screening, (screening) => screening)
  screenings: Screening[];

  @OneToMany(() => ScreeningRoom, (screeningRoom) => screeningRoom)
  screeningRooms: ScreeningRoom[];

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
