import { Episodes } from "./episodes"

export class Series {
  constructor(
    private id: string,
    private title: string,
    private date: Date,
    private synopsis: string,
    private link: string,
    private picture: string,
    private episodes: Episodes[]
  ) {}
  
  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }
  
  public getDate(): Date {
    return this.date
  }
  
  public getSynopsis(): string {
    return this.synopsis
  }
  
  public getLink(): string {
    return this.link
  }
  
  public getPicture(): string {
    return this.picture
  }

  public getEpisodes(): Episodes[] {
    return this.episodes
  }
}