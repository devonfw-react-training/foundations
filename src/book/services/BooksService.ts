import { Book, BookProperties } from "../Book";

export interface BooksService {
  findAll(): Promise<Book[]>;

  findOne(id: number): Promise<Book>;

  save(bookToSave: Book | BookProperties): Promise<Book>;
}
