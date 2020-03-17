import { Series } from "../entities/series";
import { FoundMedia } from "../../data/moviesDB";

export interface SerieGateway {
  createSerie(serie: Series): Promise<void>
  getMedia(mediaData: any): Promise<FoundMedia>
}