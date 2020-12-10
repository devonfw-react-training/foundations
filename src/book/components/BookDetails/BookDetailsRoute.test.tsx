import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import React from "react";
import { BookDetailsRoute } from "./BookDetailsRoute";
import { Book, BookProperties } from "../../Book";
import { mount } from "enzyme";
import { RouterInspector } from "../BookOverview/BookOverviewRoute.test";

describe("BookDetailsRoute", () => {
  let findOneMockPromise: Promise<Book>;
  let saveMockPromise: Promise<Book>;
  const bookServiceMock = {
    save(bookToSave: Book | BookProperties): Promise<Book> {
      const id = (bookToSave as Book).id;
      saveMockPromise = Promise.resolve({ ...bookToSave, id: id || 1 });
      return saveMockPromise;
    },

    findOne(id: number): Promise<Book> {
      findOneMockPromise = new Promise((resolve) =>
        setTimeout(() =>
          resolve({
            id: id,
            authors: "John Example",
            title: "Example Book",
          }),
        ),
      );
      return findOneMockPromise;
    },
  };

  it("renders a new book without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/book-app/book"]}>
        <BookDetailsRoute bookService={bookServiceMock} />
      </MemoryRouter>,
      div,
    );
    // then
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders an existing book without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/book-app/book/1"]}>
        <BookDetailsRoute bookService={bookServiceMock} />
      </MemoryRouter>,
      div,
    );
    // then
    return findOneMockPromise.then(() => {
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("renders a progress indicator while loading an existing book", () => {
    // given
    jest.useFakeTimers();
    expect.hasAssertions();
    // when
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/book/1"]}>
        <BookDetailsRoute bookService={bookServiceMock} />
      </MemoryRouter>,
    );
    // then
    const progressIndicator = wrapper.find("p.container");
    expect(progressIndicator).toHaveText("Loading book...");

    jest.runAllTimers();
    return findOneMockPromise;
  });

  it("renders a book form after loading it", () => {
    // given
    jest.useFakeTimers();
    expect.hasAssertions();
    // when
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/book/1"]}>
        <BookDetailsRoute bookService={bookServiceMock} />
      </MemoryRouter>,
    );
    jest.runAllTimers();

    return findOneMockPromise.then((book) => {
      wrapper.update();
      // then (AFTER resolving findOne())
      const label = wrapper.find('label[htmlFor="authors"]');
      const authors = wrapper.find("input#authors");
      expect(label).toHaveText("Authors:");
      expect(authors.prop("value")).toBe(book.authors);
    });
  });

  it("redirects to /book-app/book when book ID cannot be parsed", () => {
    // given
    expect.hasAssertions();
    const routeInspector = new RouterInspector();
    const RoutedAssert = routeInspector.component;
    // when
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/book/notParsableId"]}>
        <RoutedAssert>
          <BookDetailsRoute bookService={bookServiceMock} />
        </RoutedAssert>
      </MemoryRouter>,
    );
    // then
    expect(routeInspector.currentLocationToBe("/book-app/book")).toBeTruthy();
  });

  it("saves the edited book and redirects to /book-app/books upon form submit", () => {
    // given
    jest.useFakeTimers();
    expect.hasAssertions();
    const routeInspector = new RouterInspector();
    const RoutedAssert = routeInspector.component;
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/book/1"]}>
        <RoutedAssert>
          <BookDetailsRoute bookService={bookServiceMock} />
        </RoutedAssert>
      </MemoryRouter>,
    );
    jest.runAllTimers();
    return findOneMockPromise.then((editedBook) => {
      wrapper.update();
      const form = wrapper.find("form");
      // when
      form.simulate("submit", { preventDefault: jest.fn() });
      // then
      return saveMockPromise.then((savedBook) => {
        expect(savedBook.id).toBe(editedBook.id);
        expect(
          routeInspector.currentLocationToBe("/book-app/books"),
        ).toBeTruthy();
      });
    });
  });
});
