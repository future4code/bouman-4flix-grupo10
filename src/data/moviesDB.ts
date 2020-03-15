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

  public async getMedia(mediaData: any): Promise<FoundMedia> {
    let result 
    if (mediaData.maxLength && mediaData.minLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.moviesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration <= ${mediaData.maxLength}
      AND duration >= ${mediaData.minLength}
    `)
    } else if (mediaData.maxLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.moviesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration <= ${mediaData.maxLength}
    `)
    } else if (mediaData.minLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.moviesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration >= ${mediaData.minLength}
      `)
    } else {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.moviesTableName}
      WHERE title LIKE '%${mediaData.query}%' 
      `)
    }

    const foundMovies = 
      result[0] &&
      result[0].map((el: any) => ({
        id: el.id,
        title: el.title,
        synopsis: el.synopsis,
        picture: el.picture,
        type: "movie"
      }))
    
    return foundMovies;

  }
}

export interface FoundMedia {
  map(arg0: (el: FoundMedia) => FoundMedia): never;
  id: string,
  title: string,
  synopsis: string,
  picture: string,
  type: string
}