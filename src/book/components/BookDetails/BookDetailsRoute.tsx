import { Route, RouteComponentProps, Switch } from "react-router";
import React, { Component } from "react";
import { BookDetails } from "./BookDetails";
import { Book } from "../../Book";
import { BooksService } from "../../services/BooksService";

interface ExistingBookDetailsProps extends RouteComponentProps {
  bookService: Pick<BooksService, "save" | "findOne">;
  bookId: string;
}

interface ExistingBookDetailsState {
  book: Book | null;
}

class ExistingBookDetails extends Component<
  ExistingBookDetailsProps,
  ExistingBookDetailsState
> {
  state = {
    book: null,
  };

  componentDidMount(): void {
    const bookIdAsNumber = +this.props.bookId;
    if (isNaN(bookIdAsNumber)) {
      this.props.history.push("/book-app/book");
    } else {
      this.props.bookService.findOne(bookIdAsNumber).then(
        (book) => this.setState({ book }),
        () => this.props.history.push("/book-app/book"),
      );
    }
  }

  render() {
    if (this.state.book) {
      return (
        <BookDetails
          book={this.state.book!}
          onBookChange={(book) =>
            this.props.bookService
              .save(book)
              .then(() => this.props.history.push("/book-app/books"))
          }
        />
      );
    }
    return <p className="container">Loading book...</p>;
  }
}

interface BookDetailsRouteProps {
  bookService: Pick<BooksService, "save" | "findOne">;
}

export const BookDetailsRoute = (props: BookDetailsRouteProps) => {
  const { bookService } = props;

  return (
    <Route
      path="/book-app/book"
      render={({ match }) => (
        <Switch>
          <Route
            exact
            path={match.path}
            render={(props) => (
              <BookDetails
                {...props}
                book={{ title: "", authors: "" }}
                onBookChange={(book) =>
                  bookService
                    .save(book)
                    .then(() => props.history.push("/book-app/books"))
                }
              />
            )}
          />
          <Route
            path={`${match.path}/:id`}
            render={(props) => (
              <ExistingBookDetails
                {...props}
                bookId={props.match.params.id}
                bookService={bookService}
              />
            )}
          />
        </Switch>
      )}
    />
  );
};
