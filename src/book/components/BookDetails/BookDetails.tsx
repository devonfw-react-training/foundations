import React, { Component, SyntheticEvent } from "react";
import { Book } from "../../Book";
import styles from "./BookDetails.module.scss";

interface Props {
  book: Book;
  onBookChange?: (book: Book) => void;
}

type State = Book;

export class BookDetails extends Component<Props, State> {
  state: State = {
    ...this.props.book,
  };

  updateTitleValue = (event: SyntheticEvent) => {
    const title = getValueFromInputChangeEvent(event);
    this.setState({ title });
  };

  updateAuthorsValue = (event: SyntheticEvent) => {
    const authors = getValueFromInputChangeEvent(event);
    this.setState({ authors });
  };

  notifyOnBookChange = (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.props.onBookChange) {
      this.props.onBookChange({ ...this.state });
    }
  };

  render(): React.ReactNode {
    return (
      <div className={`${styles.form} container`}>
        <form onSubmit={this.notifyOnBookChange}>
          <div className="form-group row">
            <label htmlFor="authors" className="col-sm-4 col-form-label">
              Authors:
            </label>
            <div className="col-sm-8">
              <input
                id="authors"
                type="text"
                className="form-control"
                value={this.state.authors}
                onChange={this.updateAuthorsValue}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-4 col-form-label">
              Title:
            </label>
            <div className="col-sm-8">
              <input
                id="title"
                type="text"
                className="form-control"
                value={this.state.title}
                onChange={this.updateTitleValue}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-4 col-sm-9">
              <button className="btn btn-primary">Apply</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function getValueFromInputChangeEvent(event: SyntheticEvent) {
  const inputElement = event.target as HTMLInputElement;
  return inputElement.value;
}
