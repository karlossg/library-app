import React, { useState, useEffect, Fragment, FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchAllBooks, deleteBook } from "./utils/api";
import { sortByTitle } from "./utils/helpers";
import { BookData, Book } from "./common/Book";
import BookForm from "./BookForm";

const useStyles = makeStyles(
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "çenter"
    },
    card: {
      minWidth: 275,
      maxWidth: "45%",
      margin: 15
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    cardTitle: {
      fontSize: 14
    },
    appBar: {
      flexGrow: 1
    },
    barTitle: {
      flexGrow: 1,
      margin: 10
    },
    progress: {
      margin: "25%"
    }
  })
);

const MainPage: FunctionComponent = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isBookFormVisible, toggleBookForm] = useState<Boolean>(false);
  const classes = useStyles();

  const addNewBook = (newBook: Book) => {
    setBooks([
      ...books,
      {
        ...newBook,
        id: books.length + 1,
        addedOn: new Date()
      }
    ]);
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

  const handleDelete = (id: number | undefined) => {
    const filteredBooks = books.filter(i => i.id !== id);
    setBooks(filteredBooks);
    deleteBook(id);
  };

  const handleFormToggling = () => {
    toggleBookForm(!isBookFormVisible);
  };
  console.log(books);
  return (
    <Fragment>
      <div className={classes.appBar}>
        <AppBar position="static">
          <Typography variant="h6" className={classes.barTitle}>
            Private Books Library
          </Typography>
        </AppBar>
      </div>
      <div className={classes.container}>
        {isLoading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <Fragment>
            {books.length === 0 ? (
              <Typography variant="h6">
                You dont have any books in your library
              </Typography>
            ) : (
              books
                .sort((a: BookData, b: BookData) => sortByTitle(a, b))
                .map(book => {
                  return (
                    <Card key={book.id} className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.cardTitle}
                          color="textSecondary"
                          gutterBottom
                        >
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
                        <Button
                          onClick={() => handleDelete(book.id)}
                          size="small"
                        >
                          Delete
                        </Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  );
                })
            )}
          </Fragment>
        )}
      </div>
      {!isBookFormVisible && (
        <Button size="small" onClick={handleFormToggling}>
          Add new Book
        </Button>
      )}
      <div>
        {isBookFormVisible && (
          <BookForm
            handleFormToggling={handleFormToggling}
            addNewBook={addNewBook}
          />
        )}
      </div>
    </Fragment>
  );
};

export default MainPage;
