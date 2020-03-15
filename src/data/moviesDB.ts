import { BaseDB } from "./baseDB";
import { MovieGateway } from "../business/gateways/MovieGateway";
import { Movies } from "../business/entities/movies";

export class MoviesDB extends BaseDB implements MovieGateway {
  private moviesTableName = "movies";

  private mapDateToDbDate(input: Date): string {
    const year = input.getFullYear();
    const month = input.getMonth() + 1;
    const date = input.getDate();
    return `${year + "-" + month + "-" + date}`;
  }

  private mapDbDateToDate(input: string): Date {
    return new Date(input);
  }

  public async createMovie(movie: Movies): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.moviesTableName} (id, title, date, synopsis, link, length, picture)
      VALUES (
        '${movie.getId()}',
        '${movie.getTitle()}',
        STR_TO_DATE('${this.mapDateToDbDate(movie.getDate())}, '%Y-%m-%d'),
        '${movie.getSynopsis()}',
        '${movie.getLink()}',
        '${movie.getLenght()}',
        '${movie.getPicture()}'
      )
    `)
  } 
}