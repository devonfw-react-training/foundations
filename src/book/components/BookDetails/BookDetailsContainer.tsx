import { RouteComponentProps } from "react-router";
import React, { Component } from "react";
import { BooksService } from "../../services/BooksService";
import { Book } from "../../Book";
import { BookDetails } from "./BookDetails";

interface RouteParams {
  id: string;
}

interface BookDetailsContainerProps extends RouteComponentProps<RouteParams> {
  bookService: BooksService;
}

interface BookDetailsContainerState {
  book: Book;
}

export class BookDetailsContainer extends Component<
  BookDetailsContainerProps,
  BookDetailsContainerState
> {
  newBook: Book = { title: "", authors: "" };

  state = {
    book: this.newBook,
  };

  componentDidUpdate(
    prevProps: Readonly<BookDetailsContainerProps>,
    prevState: Readonly<BookDetailsContainerState>,
    snapshot?: any,
  ): void {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({
        book: this.newBook,
      });
    }
  }

  componentDidMount(): void {
    const bookIdAsNumber = +this.props.match.params.id;
    if (isNaN(bookIdAsNumber)) {
      this.props.history.push("/book-app/book");
    } else {
      this.props.bookService.findOne(bookIdAsNumber).then(
        (book) => this.setState({ book }),
        () => this.props.history.push("/book-app/book"),
      );
    }
  }

  onBookChange = (book: Book): Promise<any> => {
    return this.props.bookService
      .save(book)
      .then(() => this.props.history.push("/book-app/books"));
  };

  render() {
    return (
      <BookDetails
        key={this.state.book.id}
        book={this.state.book}
        onBookChange={this.onBookChange}
      />
    );
  }
}
