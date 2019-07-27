import Joi from 'joi';

export const BookDataSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  ISBN: Joi.string().regex(/((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/).required(),
  pages: Joi.number().required(),
  rate: Joi.number().required(),
}).label('BookData').required();

export const BookSchema = BookDataSchema.keys({
  id: Joi.number().required(),
  addedOn: Joi.date().required(),
}).label('Book').required();

export type BookData = Joi.SchemaValue<typeof BookDataSchema>;
export type Book = Joi.SchemaValue<typeof BookSchema>;

let lastId = 0;
let books: Book[] = [{ title: 'test', id: 1, author: 'trololo', ISBN: '978-1-4302-1998-9', pages: 333, rate: 2, addedOn: new Date('11-02-2012') }];

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
  books = books.filter(i => i.id !== id);
}