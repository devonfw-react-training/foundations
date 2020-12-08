import React, { Component, ReactNode } from "react";
import { Book } from "../../Book";
import { BookDetails } from "../BookDetails/BookDetails";
import { connect } from "react-redux";
import { ReduxState } from "../../../store/store";
import { actions } from "../../../store/book/actions";

export interface Props {
  books: Book[];
  updateBooks: (books: Book[]) => void;
}

interface State {
  books: Book[];
  selectedBook: Book | null;
}

class BookOverviewComponent extends Component<Props, State> {
  state: State = {
    books: [],
    selectedBook: null,
  };

  componentDidMount(): void {
    console.log(this.props);
    this.props.updateBooks([
      {
        id: 1,
        authors: "John Example",
        title: "Example Book",
      },
      {
        id: 2,
        authors: "Joe Smith",
        title: "Another Book",
      },
    ]);
  }

  selectBook(book: Book): void {
    this.setState({ selectedBook: book });
  }

  isBookSelected(book: Book): boolean {
    return book === this.state.selectedBook;
  }

  updateBook = (bookToUpdate: Book) => {
    this.setState((state) => {
      return {
        books: state.books.map((book) =>
          book.id === bookToUpdate.id ? bookToUpdate : book,
        ),
        selectedBook: bookToUpdate,
      };
    });
  };

  render(): ReactNode {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Authors</th>
                  <th scope="col">Title</th>
                </tr>
              </thead>
              <tbody>
                {this.props.books.map((book, index) => (
                  <tr
                    key={book.id}
                    className={this.isBookSelected(book) ? "table-active" : ""}
                    onClick={() => this.selectBook(book)}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{book.authors}</td>
                    <td>{book.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 col-12">
            {this.state.selectedBook && (
              <BookDetails
                key={this.state.selectedBook.id}
                book={this.state.selectedBook}
                onBookChange={this.updateBook}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: ReduxState) => ({
  books: state.books,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateBooks: (books: Book[]) => dispatch(actions.updateBooks(books)),
  };
};

export const BookOverview = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookOverviewComponent);
