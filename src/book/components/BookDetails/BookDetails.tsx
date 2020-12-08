import React from "react";
import { Book } from "../../Book";
import styles from "./BookDetails.module.scss";

export interface Props {
  book: Book;
}

export const BookDetails = (props: Props) => (
  <div className={styles.form}>
    <form>
      <div className="form-group row">
        <label htmlFor="authors" className="col-sm-3 col-form-label">
          Authors:
        </label>
        <div className="col-sm-9">
          <p className="form-control-plaintext" id="authors">
            {props.book.authors}
          </p>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="title" className="col-sm-3 col-form-label">
          Title:
        </label>
        <div className="col-sm-9">
          <p className="form-control-plaintext" id="title">
            {props.book.title}
          </p>
        </div>
      </div>
    </form>
  </div>
);
