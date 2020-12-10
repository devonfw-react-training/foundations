import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { BookProvider, useBookService, BookService } from "./BooksService";
import { Book } from "../Book";

const FunctionalComponent = (props: any) => {
  const hook = props.hook ? props.hook() : undefined;
  return <div data-hook={hook} />;
};
const setupWrapper = () =>
  mount(<FunctionalComponent hook={() => useBookService()} />, {
    wrappingComponent: BookProvider,
  });
describe("BookService", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("saves a new book", () => {
    // given
    const wrapper = setupWrapper();
    const { saveNew }: BookService = wrapper.find("div").prop("data-hook");
    const bookToSave = { authors: "Some author", title: "Some title" };
    // when
    act(() => {
      const savedBook = saveNew(bookToSave);
      //then
      expect(savedBook.id).toBeDefined();
      expect(savedBook.authors).toBe(bookToSave.authors);
      expect(savedBook.title).toBe(bookToSave.title);
    });
  });

  it("updates an existing book", () => {
    // given
    expect.hasAssertions();
    const bookToSave = { id: 1, authors: "Some author", title: "Some title" };
    const wrapper = setupWrapper();
    const { save, books }: BookService = wrapper.find("div").prop("data-hook");
    const prevBook = books.find(({ id }) => id === bookToSave.id) as Book;
    // when
    const savePromise: Promise<void> = save(bookToSave).then((savedBook) => {
      // then
      expect(savedBook.id).toBe(prevBook.id);
      expect(savedBook.authors).toBe(prevBook.authors);
      expect(savedBook.title).toBe(prevBook.title);
    });
    jest.runAllTimers();
    return savePromise;
  });

  it("finds a book", () => {
    // given
    expect.hasAssertions();
    const book = {
      id: 2,
      authors: "Joe Smith",
      title: "Another Book",
    };
    const wrapper = setupWrapper();
    const { findOne }: BookService = wrapper.find("div").prop("data-hook");
    // when
    const findPromise = findOne(book.id).then((foundBook) => {
      // then
      expect(foundBook.id).toBe(book.id);
      expect(foundBook.authors).toBe(book.authors);
      expect(foundBook.title).toBe(book.title);
    });
    jest.runAllTimers();
    return findPromise;
  });

  it("finds all books", () => {
    // given
    expect.hasAssertions();
    const wrapper = setupWrapper();
    const { findAll }: BookService = wrapper.find("div").prop("data-hook");
    const bookToCheck = {
      id: 2,
      authors: "Joe Smith",
      title: "Another Bookkk",
    };
    // when
    const findPromise = findAll().then((books) => {
      // then
      const bookInList = books.find(({ id }) => id === bookToCheck.id);
      expect(bookInList).toBeDefined();
    });
    jest.runAllTimers();
    return findPromise;
  });
});
