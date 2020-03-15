import { BaseDB } from "./baseDB";
import { SerieGateway } from "../business/gateways/SerieGateway";
import { Series } from "../business/entities/series";
import { Episodes } from "../business/entities/episodes";
import { FoundMedia } from "./moviesDB";

export class SeriesDB extends BaseDB implements SerieGateway {
  private seriesTableName = "series";
  private episodesTableName = "episodes";

  private mapDateToDbDate(input: Date): string {
    const year = input.getFullYear();
    const month = input.getMonth() + 1;
    const date = input.getDate();
    return `${year + "-" + month + "-" + date}`;
  }

  private mapDbDateToDate(input: string): Date {
    return new Date(input);
  }

  public async createSerie(serie: Series): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.seriesTableName} (id, title, date, synopsis, link, picture)
      VALUES (
        '${serie.getId()}',
        '${serie.getTitle()}',
        STR_TO_DATE('${this.mapDateToDbDate(serie.getDate())}, '%Y-%m-%d'),
        '${serie.getSynopsis()}',
        '${serie.getLink()}',
        '${serie.getPicture()}'
      );
    `)
    
    // verificar async/await
    serie.getEpisodes().map(async (episode: Episodes) => {
      await this.connection.raw(`
      INSERT INTO ${this.episodesTableName} (id, title, length, link, synopsis, serieId)
      VALUES (
        '${episode.getId()}',
        '${episode.getTitle()}',
        '${episode.getLength()}',
        '${episode.getLink()}',
        '${episode.getSynopsis()}',
        '${episode.getSerieId()}'
      );
      `)
    })
  }

  public async getMedia(mediaData: any): Promise<FoundMedia> {
    let result 
    if (mediaData.maxLength && mediaData.minLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.seriesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration <= ${mediaData.maxLength}
      AND duration >= ${mediaData.minLength}
    `)
    } else if (mediaData.maxLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.seriesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration <= ${mediaData.maxLength}
    `)
    } else if (mediaData.minLength) {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.seriesTableName}
      WHERE title LIKE '%${mediaData.query}%'
      AND duration >= ${mediaData.minLength}
      `)
    } else {
      result = await this.connection.raw(`
      SELECT id, title, synopsis, picture FROM ${this.seriesTableName}
      WHERE title LIKE '%${mediaData.query}%' 
      `)
    }

    const foundSeries = 
      result[0] &&
      result[0].map((el: any) => ({
        id: el.id,
        title: el.title,
        synopsis: el.synopsis,
        picture: el.picture,
        type: "serie"
      }))
    
    return foundSeries;

  }
}