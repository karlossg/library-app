import React, {
  ReactElement,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  ChangeEvent
} from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  makeStyles,
  Theme,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { Book } from "./common/Book";
import { addBook } from "./utils/api";

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      container: {
        display: "flex",
        flexWrap: "wrap"
      },
      textFieldLong: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: "40%"
      },
      textFieldShort: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: "15%"
      },
      dense: {
        marginTop: theme.spacing(2)
      },
      menu: {
        width: 200
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120
      },
      selectEmpty: {
        marginTop: theme.spacing(2)
      }
    })
);

const BookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short")
    .max(150, "Too Long")
    .required("Required"),
  author: Yup.string()
    .min(2, "Too Short")
    .max(150, "Too Long"),
  ISBN: Yup.string()
    .matches(
      /((978[--– ])?[0-9][0-9\--– ]{10}[--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/,
      "Please provide valid ISBN number (10 or 13 digits)"
    )
    .required("Required"),
  pages: Yup.number().min(0, '0 is minimum')
});

interface IProps {
  addNewBook: (newBook: Book) => void;
}

const initialState = {
  book: {
    title: "",
    author: "",
    ISBN: "",
    pages: 0,
    rate: 0
  },
  labelWidth: 0
};

const BookForm: FunctionComponent<IProps> = ({ addNewBook }) => {
  const classes = useStyles();
  const [values, setValues] = useState<Book>(initialState.book);
  const [labelWidth, setLabelWidth] = useState(initialState.labelWidth);
  const inputLabel = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const onSelect = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value
    }));
  };

  const onChange = (name: keyof Book) => (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log(event)
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const handleSubmit = (): void => {
    addBook(values);
    addNewBook(values);
    setValues(initialState.book);
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={BookSchema}
      onSubmit={handleSubmit}
      render={({ handleChange, handleBlur }): ReactElement => (
        <Form className={classes.container}>
          <Field
            validateOnBlur
            validateOnChange
            validateOnSubmit
            name="title"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <TextField
                  {...field}
                  type="text"
                  error={Boolean(form.errors.title && form.touched.title)}
                  helperText={
                    form.touched.title && form.errors.title && form.errors.title
                  }
                  id="outlined-textarea"
                  label="Title"
                  onChange={e => {
                    handleChange(e);
                    onChange("title")(e);
                  }}
                  onBlur={handleBlur}
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            )}
          />
          <Field
            name="author"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <TextField
                  {...field}
                  type="text"
                  error={Boolean(form.errors.author && form.touched.author)}
                  helperText={
                    form.touched.author &&
                    form.errors.author &&
                    form.errors.author
                  }
                  id="outlined-textarea"
                  label="Author"
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    onChange("author")(e);
                  }}
                />
              </div>
            )}
          />
          <Field
            name="ISBN"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <TextField
                  {...field}
                  type="text"
                  error={Boolean(form.errors.ISBN && form.touched.ISBN)}
                  helperText={
                    form.touched.ISBN && form.errors.ISBN && form.errors.ISBN
                  }
                  id="outlined-textarea"
                  label="ISBN"
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    onChange("ISBN")(e);
                  }}
                />
              </div>
            )}
          />
          <Field
            name="pages"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div style={{ width: "100%" }}>
                <TextField
                  {...field}
                  id="outlined-number"
                  error={Boolean(form.errors.pages && form.touched.pages)}
                  helperText={
                    form.touched.pages && form.errors.pages && form.errors.pages
                  }
                  onChange={e => {
                    handleChange(e);
                    onChange("pages")(e);
                  }}
                  label="Pages"
                  type="number"
                  className={classes.textFieldShort}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            )}
          />
          <Field
            name="rate"
            render={({ field }: FieldProps<Book>): ReactElement => (
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-rate-simple">
                    Rate
                  </InputLabel>
                  <Select
                    {...field}
                    onChange={onSelect}
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="rate"
                        id="outlined-rate-simple"
                      />
                    }
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          />
          <Button type="submit">Add</Button>
        </Form>
      )}
    />
  );
};

export default BookForm;
