export class Movies {
  constructor(
    private id: string,
    private title: string,
    private date: Date,
    private synopsis: string,
    private link: string,
    private length: number,
    private picture: string
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
  
  public getLenght(): number {
    return this.length
  }

  public getPicture(): string {
    return this.picture
  }  
}