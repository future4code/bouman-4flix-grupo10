import { MovieGateway } from "../gateways/MovieGateway";
import { v4 } from "uuid";
import { Movies } from "../entities/movies";

export class CreateMovieUC {
  constructor(private movieGateway: MovieGateway) {}

  public async execute(input: CreateMovieUCInput): Promise<CreateMovieUCOutput> {
    const id = v4()
    
    if (!input.title || !input.date || !input.synopsis || !input.link || !input.length || !input.picture) {
      throw new Error("Invalid parameters")
    }

    const formatedDate = new Date(input.date)

    await this.movieGateway.createMovie(new Movies(
      id,
      input.title,
      formatedDate,
      input.synopsis,
      input.link,
      input.length,
      input.picture
    ))

    return {
      id,
      title: input.title,
      date: formatedDate,
      synopsis: input.synopsis,
      link: input.link,
      length: input.length,
      picture: input.picture
    }
  }
}

export interface CreateMovieUCInput {
  title: string,
  date: Date,
  synopsis: string
  link: string,
  length: number,
  picture: string
}

export interface CreateMovieUCOutput {
  id: string,
  title: string,
  date: Date,
  synopsis: string
  link: string,
  length: number,
  picture: string
}