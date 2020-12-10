import express from "express";
import { readFileSync } from "fs";
import { Book } from "../src/book/Book";
import bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express-serve-static-core";

const books = (function () {
  let _books: Book[];
  const initialBookDataFilePath = __dirname + "/books.json";
  try {
    const booksAsJson = readFileSync(
      initialBookDataFilePath,
      "utf-8",
    ).toString();
    _books = JSON.parse(booksAsJson);
  } catch (e) {
    console.warn(`No book data found in path ${initialBookDataFilePath}`);
    _books = [];
  }

  const maxId = _books
    .map((book) => book.id || 0)
    .reduce((max, id) => (id > max ? id : max), 0);

  const idSeq = (function* (initSequencerValue) {
    let sequencer = initSequencerValue;
    while (true) {
      yield ++sequencer;
    }
  })(maxId);

  return {
    findAll(): Book[] {
      return [..._books];
    },

    findOne(id: number): Book | undefined {
      const originalBook = _books.find((book) => book.id === id);
      if (originalBook) {
        return { ...originalBook };
      }
    },

    save(book: Book): Book {
      const id = idSeq.next().value;
      _books.push({ ...book, id });
      return this.findOne(id)!;
    },

    update(book: Book): Book | undefined {
      const originalBook = _books.find(
        (currentBook) => currentBook.id === book.id,
      );
      if (originalBook) {
        return Object.assign(originalBook, book);
      }
    },
  };
})();

const app = express();
app.use(bodyParser.json());
app.use(noCache);

app.get("/api/books", (req, res) => {
  res.json(books.findAll());
});

app.get("/api/books/:id", (req, res) => {
  const id = +req.params.id;
  const book = books.findOne(id);
  book
    ? res.json(book)
    : res.status(404).json({ error: `Book with id: ${id} not found` });
});

app.put("/api/books", (req, res) => {
  res.json(books.save(req.body));
});

app.post("/api/books", (req, res) => {
  const bookToUpdate = req.body;
  const updatedBook = books.update(bookToUpdate);
  updatedBook
    ? res.json(updatedBook)
    : res
        .status(404)
        .json({ error: `Book with id: ${bookToUpdate.id} not found` });
});

app.listen(9000, () => {
  console.log("Server listening on port 9000!");
});

function noCache(req: Request, res: Response, next: NextFunction) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}
