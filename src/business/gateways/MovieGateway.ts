import { Movies } from "../entities/movies";

export interface MovieGateway {
  createMovie(movie: Movies): void
}