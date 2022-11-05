import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class Screening {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Movie)
  @JoinColumn()
  movie: Movie;

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column({ type: 'timestamp' })
  startsAt: Date;

  @Column()
  duration: number;

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
