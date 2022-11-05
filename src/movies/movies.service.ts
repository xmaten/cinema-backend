import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.posterUrl = createMovieDto.posterUrl;
    movie.releaseDate = createMovieDto.releaseDate;

    return this.moviesRepository.save(movie);
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }
}
