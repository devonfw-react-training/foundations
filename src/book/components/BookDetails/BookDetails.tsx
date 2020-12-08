import React, { Component } from "react";
import { Book } from "../../Book";
import styles from "./BookDetails.module.scss";

interface State {
  currentBook: Book;
}

export interface Props {}

export class BookDetails extends Component<Props, State> {
  state: State = {
    currentBook: {
      id: 1,
      title: "Example Book",
      authors: "John Example",
    },
  };

  render(): React.ReactNode {
    return (
      <div className={"container " + styles.form}>
        <form>
          <div className="form-group row">
            <label htmlFor="authors" className="col-sm-2 col-form-label">
              Authors:
            </label>
            <div className="col-sm-10">
              <p className="form-control-plaintext" id="authors">
                {this.state.currentBook.authors}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title:
            </label>
            <div className="col-sm-10">
              <p className="form-control-plaintext" id="title">
                {this.state.currentBook.title}
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
