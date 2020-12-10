import { Book } from "../Book";
import { BooksService } from "./BooksService";

export class RemoteBooksService implements BooksService {
  findOne(id: number): Promise<Book> {
    if (id || id === 0) {
      return fetch(`/api/books/${id}`).then((response) => response.json());
    } else {
      return Promise.reject(`book with id: ${id} not found`);
    }
  }

  findAll(): Promise<Book[]> {
    return fetch("/api/books").then((response) => response.json());
  }

  save(bookToSave: Book): Promise<Book> {
    const updateExisting = bookToSave.id || bookToSave.id;

    return fetch("/api/books", {
      method: updateExisting ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToSave),
    }).then((response) => response.json());
  }
}
