export class Episodes {
  constructor(
    private id: string,
    private title: string,
    private length: number,
    private link: string,
    private synopsis: string,
    private serieId: string,
  ) {}
  
  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }

  public getLength(): number {
    return this.length
  }

  public getLink(): string {
    return this.link
  }
  
  public getSynopsis(): string {
    return this.synopsis
  }
    
  public getSerieId(): string {
    return this.serieId
  }
}