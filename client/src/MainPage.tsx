import React, { useState, useEffect, Fragment, FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { fetchAllBooks, deleteBook } from "./utils/api";
import { sortByTitle } from "./utils/helpers";
import { Book } from "./common/Book";
import BookForm from "./BookForm";

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      minWidth: 275,
      maxWidth: '45%',
      margin: 15 
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    }
  }),
);

const MainPage: FunctionComponent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const classes = useStyles();

  const addNewBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchAllBooks();

      setBooks(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete =  (id: number | undefined) => {
    const filteredBooks = books.filter(i => i.id !== id);
    setBooks(filteredBooks)
    deleteBook(id)
  }

  return (
    <Fragment>
      <h1> Libary App </h1>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div className={classes.container}>
          {books.length === 0 ? (
            <div> No books found </div>
          ) : (
            books
              .sort((a: Book, b: Book) => sortByTitle(a, b))
              .map(book => {
                return (
                  <Card id={String(book.id)} className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      ISBN: {book.ISBN}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {book.title}  
                    </Typography> 
                   
                    <Typography variant="body2" component="p">
                      Author: {book.author}
                      <br />
                      Pages: {book.pages}
                      <br />
                      Rate: {book.rate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleDelete(book.id)} size="small">Delete</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
                )
              })
          )}
        </div>
      )}
      <div>
        <BookForm addNewBook={addNewBook} />
      </div>
    </Fragment>
  );
};

export default MainPage;
