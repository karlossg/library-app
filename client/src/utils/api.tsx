import axios from 'axios'

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
