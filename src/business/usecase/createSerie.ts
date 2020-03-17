import { v4 } from "uuid";
import { SerieGateway } from "../gateways/SerieGateway";
import { Series } from "../entities/series";
import { Episodes } from "../entities/episodes";
import { InvalidParameterError } from "../error/InvalidParameterError";

export class CreateSerieUC {
  constructor(private serieGateway: SerieGateway) {}

  public async execute(input: CreateSerieUCInput): Promise<CreateSerieUCOutput> {
    const idSerie = v4()
    
    if (!input.title ||
      !input.date ||
      !input.synopsis ||
      !input.link ||
      !input.picture ||
      !input.episodes)
    {
      throw new InvalidParameterError("Invalid parameters")
    }

    const formatedDate = new Date(input.date)

    const episodesList: Episodes[] = input.episodes.map((episode: EpisodeInput) => ({
      id: v4(),
      title: episode.title,
      length: episode.length,
      link: episode.link,
      synopsis: episode.synopsis,
      serieId: idSerie
    })) 

    await this.serieGateway.createSerie(new Series(
      idSerie,
      input.title,
      formatedDate,
      input.synopsis,
      input.link,
      input.picture,
      episodesList
    ))

    return {
      id: idSerie,
      title: input.title,
      date: formatedDate,
      synopsis: input.synopsis,
      link: input.link,
      picture: input.picture,
      episodes: episodesList
    }
  }
}

export interface CreateSerieUCInput {
  title: string,
  date: Date,
  synopsis: string
  link: string,
  picture: string,
  episodes: any
}

export interface CreateSerieUCOutput {
  id: string,
  title: string,
  date: Date,
  synopsis: string
  link: string,
  picture: string,
  episodes: any
}

export interface EpisodeInput {
  title: string,
  length: number,
  link: string,
  synopsis: string
  serieId: string
}