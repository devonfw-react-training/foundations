import React, { Component, SyntheticEvent } from "react";
import { Book } from "../../Book";
import styles from "./BookDetails.module.scss";
import { Field, FieldProps, Form, Formik } from "formik";

function isEmptyInputValue(value: any) {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function notEmptyAndMaxLengthOf(maxLength: number) {
  return (value: any) => {
    if (isEmptyInputValue(value)) {
      return "Please provide a value!";
    } else if (value.length != null && value.length > maxLength) {
      return `Please provide a value not longer than ${maxLength} characters!`;
    }
  };
}

export interface Props {
  book: Book;
  onBookChange?: (book: Book) => Promise<any>;
}

export const BookDetails = (props: Props) => (
  <div className={`${styles.form} container`}>
    <Formik
      initialValues={props.book}
      onSubmit={(values: Book, { setSubmitting }) => {
        if (props.onBookChange) {
          props.onBookChange({ ...values }).then(() => setSubmitting(false));
        }
      }}
      render={() => (
        <Form>
          <div className="form-group row">
            <label htmlFor="authors" className="col-sm-4 col-form-label">
              Authors:
            </label>
            <div className="col-sm-8">
              <Field
                name="authors"
                component={BookDetailsInputComponent}
                validate={notEmptyAndMaxLengthOf(15)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-4 col-form-label">
              Title:
            </label>
            <div className="col-sm-8">
              <Field
                name="title"
                component={BookDetailsInputComponent}
                validate={notEmptyAndMaxLengthOf(50)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-4 col-sm-9">
              <button type="submit" className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>
        </Form>
      )}
    />
  </div>
);

const BookDetailsInputComponent = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) => (
  <div>
    <input
      type="text"
      className={`form-control ${
        touched[field.name] && errors[field.name] ? "is-invalid" : ""
      }`}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <div className="invalid-feedback">{errors[field.name]}</div>
    )}
  </div>
);
