import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Book, BookProperties } from "../../Book";
import styles from "./BookDetails.module.scss";

export interface Props {
  book: Book | BookProperties;
  onBookChange?: (book: Book | BookProperties) => Promise<any>;
}

const InputGroup = ({ name, label }: { name: string; label: string }) => (
  <div className="form-group row">
    <label htmlFor={name} className="col-sm-4 col-form-label">
      {label}:
    </label>
    <div className="col-sm-8">
      <Field
        name={name}
        type="text"
        className="form-control"
        validate={checkLength(3, 15)}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="invalid-feedback d-block">{msg}</div>}
      </ErrorMessage>
    </div>
  </div>
);

const checkLength = (min: number, max: number) => (str: string) => {
  if (str.length < min) {
    return `Please provide a value with at least ${min} characters.`;
  }
  if (str.length > max) {
    return `Please provide a value with at most ${max} characters.`;
  }
};

export const BookDetails = (props: Props) => (
  <div className={`${styles.form} container`}>
    <Formik
      initialValues={props.book}
      onSubmit={(book, { setSubmitting }) => {
        if (props.onBookChange) {
          props.onBookChange({ ...book }).then(() => setSubmitting(false));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputGroup name="authors" label="Authors" />
          <InputGroup name="title" label="Title" />
          <div className="form-group row">
            <div className="offset-sm-4 col-sm-9">
              <button disabled={isSubmitting} className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
