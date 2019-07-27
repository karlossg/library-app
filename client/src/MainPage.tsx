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
      flexWrap: "wrap"
    },
    card: {
      minWidth: 275,
      maxWidth: "45%",
      margin: 15
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
    },
    addButton: {
      margin: 10
    }
  })
);

const MainPage: FunctionComponent = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [bookDataForEdit, setBookDataForEdit] = useState<BookData>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isAddBookFormVisible, toggleAddBookForm] = useState<Boolean>(false);
  const [isEditBookFormVisible, toggleEditBookForm] = useState<Boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchAllBooks();

      setBooks(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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

  const handleDelete = (id: number | undefined) => {
    const filteredBooks = books.filter(i => i.id !== id);
    setBooks(filteredBooks);
    deleteBook(id);
  };

  const handleEdit = (id: number, newBookData: BookData) => {
    const filteredBooks = books.filter(i => i.id !== id);
    setBooks([...filteredBooks, newBookData]);
  };

  const handleFormToggling = (id?: number) => {
    if (id && typeof id === "number") {
      const bookForEdit = books.filter(book => book.id === id)[0];
      setBookDataForEdit(bookForEdit);
      toggleEditBookForm(!isEditBookFormVisible);
    }
    toggleAddBookForm(!isAddBookFormVisible);
  };
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
                        {!isEditBookFormVisible && (
                          <Button
                            onClick={() => handleDelete(book.id)}
                            size="small"
                          >
                            Deleted
                          </Button>
                        )}
                        {!isAddBookFormVisible && (
                          <Button
                            onClick={() => handleFormToggling(book.id)}
                            size="small"
                          >
                            Edit
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  );
                })
            )}
          </Fragment>
        )}
      </div>
      {!isAddBookFormVisible && !isEditBookFormVisible && (
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={() => handleFormToggling()}
        >
          Add new Book
        </Button>
      )}
      <div>
        {isAddBookFormVisible && !isEditBookFormVisible && (
          <BookForm
            handleFormToggling={handleFormToggling}
            addNewBook={addNewBook}
          />
        )}
        {isEditBookFormVisible && (
          <BookForm
            handleFormToggling={handleFormToggling}
            forEdit={true}
            bookData={bookDataForEdit}
            editBook={handleEdit}
          />
        )}
      </div>
    </Fragment>
  );
};

export default MainPage;
