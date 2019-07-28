import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { BookData } from "../common/Book";

const useStyles = makeStyles(
  createStyles({
    card: {
      minWidth: 275,
      maxWidth: "45%",
      margin: 15
    },
    cardTitle: {
      fontSize: 14
    }
  })
);

interface IProps {
  book: BookData;
  isEditBookFormVisible: Boolean;
  isAddBookFormVisible: Boolean;
  handleDelete: (id: number) => void;
  handleFormToggling: (id: number) => void;
}

const BookCard: FunctionComponent<IProps> = ({
  book: { id, ISBN, title, author, pages, rate },
  isEditBookFormVisible,
  isAddBookFormVisible,
  handleDelete,
  handleFormToggling
}) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.cardTitle}
          color="textSecondary"
          gutterBottom
        >
          ISBN: {ISBN}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        <Typography variant="body2" component="p">
          Author: {author}
          <br />
          Pages: {pages}
          <br />
          Rate: {rate}
        </Typography>
      </CardContent>
      <CardActions>
        {!isEditBookFormVisible && (
          <Button onClick={() => handleDelete(id)} size="small">
            Deleted
          </Button>
        )}
        {!isAddBookFormVisible && (
          <Button onClick={() => handleFormToggling(id)} size="small">
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
