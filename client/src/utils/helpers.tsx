import { Book } from "../common/Book";

export const sortByTitle = (bookA: Book, bookB: Book) => {
  const titleA = bookA.title.toUpperCase()
  const titleB = bookB.title.toUpperCase()
  if (titleA < titleB) {
    return -1
  }
  if (titleA > titleB) {
    return 1
  }
  return 0
}