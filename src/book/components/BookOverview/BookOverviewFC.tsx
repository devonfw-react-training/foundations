import React from "react";
import { Book } from "../../Book";

export interface Props {
  books: Book[];
  selectBook: (book: Book) => void;
}

export const BookOverviewFC = (props: Props) => {
  const { books, selectBook } = props;

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
            <tr key={book.id} onClick={() => selectBook(book)}>
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
