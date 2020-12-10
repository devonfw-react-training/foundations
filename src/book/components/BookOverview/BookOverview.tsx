import React, { useState, useEffect } from "react";
import { Book } from "../../Book";
import { BookDetails } from "../BookDetails/BookDetails";
import { useBookService } from "../../services/BooksService";

export interface Props {}

export const BookOverview = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>({
    id: 0,
    authors: "",
    title: "",
  });
  const { findAll } = useBookService();
  useEffect(() => {
    findAll().then((books) => {
      setBooks(books);
    });
  }, []);
  const selectBook = (book: Book): void => {
    setSelectedBook(book);
  };

  const isBookSelected = (book: Book): boolean => {
    return book === selectedBook;
  };
  const updateBook = (bookToUpdate: Book) => {
    setBooks((state: Book[]) => {
      return state.map((book: Book) =>
        book.id === bookToUpdate.id ? bookToUpdate : book,
      );
    });
    setSelectedBook(bookToUpdate);
  };
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
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  className={isBookSelected(book) ? "table-active" : ""}
                  onClick={() => selectBook(book)}
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
          {selectedBook && (
            <BookDetails
              key={selectedBook.id}
              book={selectedBook}
              onBookChange={updateBook}
            />
          )}
        </div>
      </div>
    </div>
  );
};
