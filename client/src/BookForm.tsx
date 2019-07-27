import React, { ReactElement, FunctionComponent, useState, useRef, useEffect } from "react";
import { Formik, FormikActions, Form, Field, FieldProps } from "formik";
import {
  makeStyles,
  Theme,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Book } from "./common/Book";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
      textFieldMedium: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: "25%"
      },
      dense: {
        marginTop: theme.spacing(2)
      },
      menu: {
        width: 200
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    })
);


const BookForm: FunctionComponent = () => {
  const classes = useStyles();
  const [values, setValues] = useState<Book>({
    title: "",
    author: "",
    ISBN: "",
    pages: 0,
    rate: 0
  });
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);
  
  const  handleSelect = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  };

  const handleChange = (name: keyof Book) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  console.log(values);
  return (
    <Formik
      initialValues={values}
      onSubmit={(values: Book, actions: FormikActions<Book>): void => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      render={(): ReactElement => (
        <Form>
          <Field
            name="title"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <TextField
                  {...field}
                  type="text"
                  id="outlined-textarea"
                  label="Title"
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange("title")}
                />
                {form.touched.title && form.errors.title && form.errors.title}
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
                  id="outlined-textarea"
                  label="Author"
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                  value={values.author}
                  onChange={handleChange("author")}
                />
                {form.touched.author &&
                  form.errors.author &&
                  form.errors.author}
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
                  id="outlined-textarea"
                  label="ISBN"
                  multiline
                  className={classes.textFieldLong}
                  margin="normal"
                  variant="outlined"
                  value={values.ISBN}
                  onChange={handleChange("ISBN")}
                />
                {form.touched.ISBN && form.errors.ISBN && form.errors.ISBN}
              </div>
            )}
          />
          <Field
            name="pages"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <TextField
                  {...field}
                  id="outlined-number"
                  label="Pages"
                  value={values.pages}
                  onChange={handleChange("pages")}
                  type="number"
                  className={classes.textFieldShort}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
                {form.touched.pages && form.errors.pages && form.errors.pages}
              </div>
            )}
          />
          <Field
            name="rate"
            render={({ field, form }: FieldProps<Book>): ReactElement => (
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-rate-simple">
                  Rate
                </InputLabel>
                <Select
                  {...field}
                  value={values.rate}
                  onChange={handleSelect}
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
                {form.touched.rate && form.errors.rate && form.errors.rate}
                </FormControl>
              </div>
            )}
          />
        </Form>
      )}
    />
  );
};

export default BookForm;
