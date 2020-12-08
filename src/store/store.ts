import { createStore } from "redux";
import { bookReducer } from "./book/bookReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Book } from "../book/Book";

export interface ReduxState {
  books: Book[];
}

export const store = createStore(bookReducer, composeWithDevTools());
