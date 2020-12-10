import React, { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./BookDetails.module.scss";
import { RouteComponentProps } from "react-router-dom";
import { useBookService } from "../../services/BooksService";

interface RouteProps {
  id?: string
}

export const BookDetails: FunctionComponent<RouteComponentProps<RouteProps>> = ({ history, match: { params: { id } } }) => {
  const { save, findOne } = useBookService();
  const [authors, setAuthors] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [bookId, setBookId] = useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (id) {
      findOne(+id).then(book => {
        setAuthors(book.authors);
        setTitle(book.title);
        setBookId(book.id);
      });
    }
  }, []);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    save({ authors, title, id: bookId }).then(() => history.push("/book-app/books"));
  };

  return (
    <div className={`${styles.form} container`}>
      <form onSubmit={submit}>
        <div className="form-group row">
          <label htmlFor="authors" className="col-sm-3 col-form-label">
            Authors:
          </label>
          <div className="col-sm-9">
            <input
              id="authors"
              type="text"
              className="form-control"
              value={authors}
              onChange={event => setAuthors(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Title:
          </label>
          <div className="col-sm-9">
            <input
              id="title"
              type="text"
              className="form-control"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-3 col-sm-9">
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
};
