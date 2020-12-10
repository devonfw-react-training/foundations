import React, { Component } from "react";
import { Book } from "../../Book";
import { BooksService } from "../../services/BooksService";
import { RouteComponentProps } from "react-router";
import { BookOverviewFC } from "./BookOverviewFC";

export interface Props extends RouteComponentProps {
  bookService: Pick<BooksService, "findAll">;
}

interface State {
  books: Book[];
}

export class BookOverviewContainer extends Component<Props, State> {
  state: State = {
    books: [],
  };

  componentDidMount(): void {
    this.props.bookService.findAll().then((books) => this.setState({ books }));
  }

  selectBook = (book: Book) => {
    this.props.history.push(`/book-app/book/${book.id}`);
  };

  render() {
    return (
      <BookOverviewFC books={this.state.books} selectBook={this.selectBook} />
    );
  }
}
