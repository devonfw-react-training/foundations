import React, { FunctionComponent, useEffect, useState } from "react";
import { Book } from "../../Book";
import { useBookService } from "../../services/BooksService";
import { RouteComponentProps } from "react-router-dom";

export const BookOverview: FunctionComponent<RouteComponentProps> = ({history}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { findAll } = useBookService();

  useEffect(() => {
    findAll().then((books: Book[]) => setBooks(books));
  }, []);

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
        {books.map((book, index) => (
          <tr key={book.id} onClick={() => history.push(`/book-app/book/${book.id}`)}>
            <th scope="row">{index + 1}</th>
            <td>{book.authors}</td>
            <td>{book.title}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
