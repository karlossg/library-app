export interface BookFormDataInterface {
  title: string,
  author: string,
  ISBN: string,
  pages: number,
  rate: number,
}
export interface BookDataInterface {
  id: number,
  addedOn?: Date
}


export type BookData = BookFormDataInterface & BookDataInterface
export type Book = BookFormDataInterface