import { Movies } from "../entities/movies";
import { FoundMedia } from "../../data/moviesDB";

export interface MovieGateway {
  createMovie(movie: Movies): Promise<void>
  getMedia(mediaData: any): Promise<FoundMedia>
}