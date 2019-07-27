import React, { useState, useEffect, Fragment, FunctionComponent } from 'react'
 
import { fetchAllBooks } from './utils/api'
import { sortByTitle } from './utils/helpers'
import { Book } from './common/Book';

const MainPage: FunctionComponent = () => {
  const [data, setData] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetchAllBooks()
      
      setData(response.data)
      setIsLoading(false)
    }

    fetchData()
  }, [])


  return (
    <Fragment>
      <h1> Libary App </h1>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div>
          {data.length === 0 ? (
            <div> No books found </div>
          ) : (
            data.sort((a: Book, b: Book) => sortByTitle(a, b))
              .map((book) => (
                  <p key={book.id}>{book.title}</p>
              ))
          )}
        </div>
      )}
    </Fragment>
  )
}

export default MainPage
