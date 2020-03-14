export class Episodes {
  constructor(
    private id: string,
    private title: string,
    private link: string,
    private synopsis: string,
    private picture: string,
  ) {}
  
  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }

  public getLink(): string {
    return this.link
  }
  
  public getSynopsis(): string {
    return this.synopsis
  }
    
  public getPicture(): string {
    return this.picture
  }
}