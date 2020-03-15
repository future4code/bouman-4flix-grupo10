import { Series } from "../entities/series";

export interface SerieGateway {
  createSerie(serie: Series): Promise<void>
}