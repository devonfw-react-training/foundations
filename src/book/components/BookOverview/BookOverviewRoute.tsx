import { BooksService } from "../../services/BooksService";
import { BookOverview } from "./BookOverview";
import { Route } from "react-router";
import React from "react";

export interface Props {
  bookService: Pick<BooksService, "findAll">;
}

export const BookOverviewRoute = (props: Props) => {
  const { bookService } = props;

  return (
    <Route
      path="/book-app/books"
      render={(props) => (
        <BookOverview
          bookService={bookService}
          onBookSelection={(book) =>
            props.history.push(`/book-app/book/${book.id}`)
          }
        />
      )}
    />
  );
};
