import Joi from 'joi';
import Boom from '@hapi/boom';
import { Plugin } from 'hapi';
import {
  BookSchema,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  BookDataSchema,
} from 'src/models/Book';

export const BookRoutePlugin: Plugin<never> = {
    name: 'Book Routes',
    async register(server) {
      await server.route({
        method: 'GET',
        path: '/',
        options: {
          tags: ['api'],
          response: {
            schema: Joi.array()
              .items(BookSchema.optional())
              .required(),
          },
        },
        async handler() {
          return getAllBooks();
        },
      });

      await server.route({
        method: 'GET',
        path: '/{id}',
        options: {
          tags: ['api'],
          response: {
            schema: BookSchema.required(),
          },
          validate: {
            params: Joi.object({
              id: Joi.number().required(),
            }).required(),
          },
        },
        async handler(request) {
          const { id } = request.params;

          const book = await getBookById(id);
          if (!book) {
            throw Boom.notFound('Book not found!');
          }

          return book;
        },
      });

      await server.route({
        method: 'POST',
        path: '/',
        options: {
          tags: ['api'],
          response: {
            schema: BookSchema.required(),
          },
          validate: {
            payload: BookDataSchema,
          },
        },
        async handler(request) {
          const book = await createBook(request.payload);
          return book;
        },
      });

      await server.route({
        method: 'PUT',
        path: '/{id}',
        options: {
          tags: ['api'],
          response: {
            schema: null,
          },
          validate: {
            payload:  BookDataSchema.required(),
            params: Joi.object({
              id: Joi.string().required(),
            }).required(),
          },
        },
        async handler(request) {
          const id = +request.params.id.split('')[1];
          await updateBook(id, request.payload);
          return null;
        },
      });

      await server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
          tags: ['api'],
          response: {
            schema: null,
          },
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }).required(),
          },
        },
        async handler(request) {
          const id = +request.params.id.split('')[1];

          await deleteBook(Number(id));
          return null;
        },
      });
    },
};