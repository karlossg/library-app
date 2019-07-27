import axios from 'axios'
import { Book } from '../common/Book';

const URL = 'http://localhost:8080/books' //DevSkim: ignore DS137138 

export const fetchAllBooks = () => {
  return axios
    .get(URL)
    .then(response => response)
    .catch(error => {
      console.log(error)
      throw new Error(error)
    })
}

export const addBook = (bookData: Book) => {
  return axios
    .post(URL, bookData)
    .then(response => response)
    .catch(error => {
      console.log(error)
      throw new Error(error)
    })
}

export const deleteBook = (bookId: number | undefined) => {
  return axios
  .delete(`${URL}/{${bookId}}`)
  .then(response => response)
  .catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

export const updateBook = (bookId: number, bookData: Book) => {
  return axios
  .put(`${URL}/{${bookId}}`, bookData)
  .then(response => response)
  .catch(error => {
    console.log(error)
    throw new Error(error)
  })
}