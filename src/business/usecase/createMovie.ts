import { MovieGateway } from "../gateways/MovieGateway";

export class CreateMovieUC {
  constructor(private movieGateway: MovieGateway) {}

  public async execute(input: CreateMovieUCInput): Promise<void> {

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