import { Book } from "../Book";

export interface BooksService {
  findAll(): Promise<Book[]>;

  findOne(id: number): Promise<Book>;

  save(bookToSave: Book): Promise<Book>;
}
