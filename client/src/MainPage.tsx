import React, { useState, useEffect, Fragment } from 'react'

import { fetchAllBooks } from './utils/api'
import { sortByTitle } from './utils/helpers'

const MainPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
            data.sort((a: any, b: any) => sortByTitle(a, b))
              .map((book: any) => (
                  <p key={book.id}>{book.title}</p>
              ))
          )}
        </div>
      )}
    </Fragment>
  )
}

export default MainPage
