import { MovieGateway } from "../gateways/MovieGateway";
import { SerieGateway } from "../gateways/SerieGateway";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { FoundMedia } from "../../data/moviesDB";


export class SearchMediaUC {
  constructor(
    private movieGateway: MovieGateway,
    private serieGateway: SerieGateway
  ){}

  public async execute(input: SerchMediaUCInput): Promise<any> {
    if (!input.query) {
      throw new InvalidParameterError("Invalid parameters")
    }

    const movieResults = await this.movieGateway.getMedia(input)
    const serieResults = await this.serieGateway.getMedia(input)

    const result = { results: []}

    if (movieResults) {
      result.results.push(movieResults.map((el: FoundMedia) => (el)))
    } else if (serieResults) {
      result.results.push(serieResults.map((el: FoundMedia) => (el)))
    }

    return result;
  }
}

export interface SerchMediaUCInput {
  query: string, 
  maxLength?: number,
  minLength?: number
}