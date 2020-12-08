import { Book } from "../../book/Book";

export const UPDATE_BOOKS = "UPDATE_BOOKS";

const updateBooks = (books: Book[]) => ({
  type: UPDATE_BOOKS,
  payload: books,
});

export const actions = {
  updateBooks,
};

export const types = {
  UPDATE_BOOKS,
};
