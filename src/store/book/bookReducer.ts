import { types } from "./actions";
import { Book } from "../../book/Book";

const initialState = {
  books: [],
};

type Action = {
  type: string;
  payload: any;
};

export const bookReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.UPDATE_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};
