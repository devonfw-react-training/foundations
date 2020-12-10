import React, { createContext, FC, useContext, useState } from "react";
import { Book, BookProperties } from "../Book";

export interface BookService {
  books: Book[];
  findAll: () => Promise<Book[]>;
  findOne: (id: number) => Promise<Book>;
  save: (bookToSave: Book) => Promise<Book>;
  saveNew: (book: BookProperties) => Book;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const BookContext = createContext<BookService>({} as BookService);

export const BookProvider: FC = (props) => {
  const [books, setBooks] = useState<Book[]>([
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
  let sequencer: number = books.length + 1;

  const findAll: BookService["findAll"] = () => {
    return delay(2000).then(() => [...books]);
  };
  const findOne: BookService["findOne"] = (id) => {
    const book = books.find((book) => book.id === id);
    return delay(1000).then(() => {
      if (!book) throw new Error(`book with id: ${id} not found`);
      return book;
    });
  };
  const save: BookService["save"] = (bookToSave) => {
    const id = bookToSave.id;
    if (id) {
      const book = books.find((book) => book.id === id);
      if (book) {
        Object.assign(book, bookToSave);
        return findOne(id);
      }
    }
    return saveNewAndFindOne(bookToSave);
  };
  const saveNew: BookService["saveNew"] = (bookToSave) => {
    const savedBook = { ...bookToSave, id: nextId() };
    setBooks( [...books, savedBook]);
    return savedBook;
  };
  const saveNewAndFindOne = (bookToSave: BookProperties) => {
    return Promise.resolve(saveNew(bookToSave));
  };

  const nextId = () => sequencer++;
  return (
    <BookContext.Provider
      value={{
        books,
        findAll,
        findOne,
        save,
        saveNew,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};
export const useBookService = () => {
  return useContext(BookContext);
};
