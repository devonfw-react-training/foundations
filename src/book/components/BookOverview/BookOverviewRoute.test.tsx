import ReactDOM from "react-dom";
import { MemoryRouter, withRouter } from "react-router";
import { BookOverview } from "./BookOverview";
import React from "react";
import { Book } from "../../Book";
import { BookOverviewRoute } from "./BookOverviewRoute";
import { mount } from "enzyme";
import * as H from "history";

export class RouterInspector {
  private routerLocation: H.Location | null = null;

  readonly component = withRouter((props) => {
    const { location } = props;
    this.routerLocation = location;
    return <div>{props.children}</div>;
  });

  currentLocationToBe(expectedLocationPath: string): boolean {
    return (
      !!this.routerLocation &&
      this.routerLocation.pathname === expectedLocationPath
    );
  }
}

describe("BookOverviewRoute", () => {
  const books = [
    {
      id: 1,
      authors: "John Example",
      title: "Example Book",
    },
    {
      id: 2,
      authors: "Joe Smith",
      title: "Another Book",
    },
  ];

  let bookServiceMockPromise: Promise<Book[]>;
  const bookServiceMock = {
    findAll() {
      bookServiceMockPromise = Promise.resolve(books);
      return bookServiceMockPromise;
    },
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/book-app/books"]}>
        <BookOverviewRoute bookService={bookServiceMock} />
      </MemoryRouter>,
      div,
    );
    return bookServiceMockPromise.then(() => {
      // make sure assertions are done AFTER the state is updated
      // then
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("sets the books and renders them after routing", () => {
    // given
    expect.hasAssertions();
    // when
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/books"]}>
        <BookOverviewRoute bookService={bookServiceMock} />
      </MemoryRouter>,
    );
    return bookServiceMockPromise.then(() => {
      // make sure assertions are done AFTER the state is updated
      // then
      wrapper.update();
      const bookOverviewWrapper = wrapper.find("BookOverview");
      expect(bookOverviewWrapper).toHaveState("books", books);

      const masterTable = wrapper.find("table");
      expect(masterTable).toExist();
      const rows = masterTable.find("tbody tr");
      expect(rows).toHaveLength(2);
    });
  });

  it("redirects to BookDetails upon click on a row", () => {
    // given
    expect.hasAssertions();
    const routeInspector = new RouterInspector();
    const RoutedAssert = routeInspector.component;
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/books"]}>
        <RoutedAssert>
          <BookOverviewRoute bookService={bookServiceMock} />
        </RoutedAssert>
      </MemoryRouter>,
    );
    return bookServiceMockPromise.then(() => {
      // make sure assertions are done AFTER the state is updated
      wrapper.update();
      const firstRow = wrapper.find("table tbody tr").at(0);
      // when
      firstRow.simulate("click");
      // then
      expect(
        routeInspector.currentLocationToBe(`/book-app/book/${books[0].id}`),
      ).toBeTruthy();
    });
  });
});
