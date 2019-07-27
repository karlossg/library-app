import Joi from 'joi';

export const BookDataSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().allow('').required(),
  ISBN: Joi.string().regex(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/).required(),
  pages: Joi.number().allow(0).required(),
  rate: Joi.number().min(0).allow(0).required(),
}).label('BookData').required();

export const BookSchema = BookDataSchema.keys({
  id: Joi.number().required(),
  addedOn: Joi.date().required(),
}).label('Book').required();

export type BookData = Joi.SchemaValue<typeof BookDataSchema>;
export type Book = Joi.SchemaValue<typeof BookSchema>;

let lastId = 0;
let books: Book[] = [];

export async function getAllBooks(): Promise<Book[]> {
  return books;
}

export async function getBookById(id: Book['id']): Promise<Book | undefined> {
  return books.find(i => i.id === id);
}

export async function createBook(bookData: BookData): Promise<Book> {
  const id = ++lastId;

  const newBook = {
    id,
    addedOn: new Date(),
    ...bookData,
  };

  books = [...books, newBook];
  return newBook;
}

export async function updateBook(id: Book['id'], bookData: BookData): Promise<void> {
  books = books.map(i => {
    if (i.id === id) {
      return {
        ...i,
        ...bookData,
      };
    } else {
      return i;
    }
  });
}

export async function deleteBook(id: Book['id']): Promise<void> {
  console.log(id)
  books = books.filter(i => i.id !== id);
}