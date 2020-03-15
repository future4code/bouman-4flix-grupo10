import { BaseDB } from "./baseDB";
import { SerieGateway } from "../business/gateways/SerieGateway";
import { Series } from "../business/entities/series";
import { Episodes } from "../business/entities/episodes";

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
}