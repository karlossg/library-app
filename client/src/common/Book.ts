import * as Joi from 'typesafe-joi'

export const BookDataSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  ISBN: Joi.string().regex(/((978[--– ])?[0-9][0-9\--– ]{10}[--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/).required(),
  pages: Joi.number().required(),
  rate: Joi.number().required(),
}).label('BookData').required();

export const BookSchema = BookDataSchema.keys({
  id: Joi.number().required(),
  addedOn: Joi.date().required(),
}).label('Book').required();

export type BookData = Joi.SchemaValue<typeof BookDataSchema>;
export type Book = Joi.SchemaValue<typeof BookSchema>;
