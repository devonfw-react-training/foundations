import { BooksService } from "./BooksService";
import { LocalBooksService } from "./LocalBooksService";

describe("LocalBooksService", () => {
  let bookService: BooksService;

  beforeEach(() => {
    bookService = new LocalBooksService();
    jest.useFakeTimers();
  });

  it("saves a new book", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { authors: "Some author", title: "Some title" };
    // when
    const savePromise = bookService.save(bookToSave).then((savedBook) => {
      // then
      expect(savedBook.id).toBeDefined();
      expect(savedBook.authors).toBe(bookToSave.authors);
      expect(savedBook.title).toBe(bookToSave.title);
    });
    jest.runAllTimers();

    return savePromise;
  });

  it("updates an existing book", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { authors: "Some author", title: "Some title" };
    const savePromise = bookService.save(bookToSave).then((savedBook) => {
      // when
      savedBook.authors = "Updated authors";
      savedBook.title = "Updated title";
      const updatePromise = bookService.save(savedBook).then((updatedBook) => {
        // then
        expect(updatedBook.id).toBe(savedBook.id);
        expect(updatedBook.authors).toBe(savedBook.authors);
        expect(updatedBook.title).toBe(savedBook.title);
      });
      jest.runAllTimers();
      return updatePromise;
    });
    jest.runAllTimers();

    return savePromise;
  });

  it("finds a book", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { authors: "Some author", title: "Some title" };
    const savePromise = bookService.save(bookToSave).then((savedBook) => {
      // when
      const findPromise = bookService
        .findOne(savedBook.id)
        .then((foundBook) => {
          // then
          expect(foundBook.id).toBe(savedBook.id);
          expect(foundBook.authors).toBe(savedBook.authors);
          expect(foundBook.title).toBe(savedBook.title);
        });
      jest.runAllTimers();
      return findPromise;
    });
    jest.runAllTimers();

    return savePromise;
  });

  it("finds all books", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { authors: "Some author", title: "Some title" };
    const savePromise = bookService.save(bookToSave).then((savedBook) => {
      // when
      const findPromise = bookService.findAll().then((books) => {
        // then
        const bookInList = books.find((book) => book.id === savedBook.id);
        expect(bookInList).toBeDefined();
      });
      jest.runAllTimers();
      return findPromise;
    });
    jest.runAllTimers();

    return savePromise;
  });
});
