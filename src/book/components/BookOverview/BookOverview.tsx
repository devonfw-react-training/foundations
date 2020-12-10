import React, { Component, ReactNode } from "react";
import { Book } from "../../Book";
import { BooksService } from "../../services/BooksService";

export interface Props {
  bookService: Pick<BooksService, "findAll">;
  onBookSelection?: (selectedBook: Book) => void;
}

interface State {
  books: Book[];
}

export class BookOverview extends Component<Props, State> {
  state: State = {
    books: [],
  };

  componentDidMount(): void {
    this.props.bookService.findAll().then((books) => this.setState({ books }));
  }

  selectBook(book: Book): void {
    if (this.props.onBookSelection) {
      this.props.onBookSelection(book);
    }
  }

  render(): ReactNode {
    return (
      <div className="container">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Authors</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book, index) => (
              <tr key={book.id} onClick={() => this.selectBook(book)}>
                <th scope="row">{index + 1}</th>
                <td>{book.authors}</td>
                <td>{book.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
