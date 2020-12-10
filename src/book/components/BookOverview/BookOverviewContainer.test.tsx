import React from "react";
import ReactDOM from "react-dom";
import { match } from "react-router";
import { BookOverviewContainer } from "./BookOverviewContainer";
import { createLocation, createMemoryHistory } from "history";
import { mount } from "enzyme";
import { Book } from "../../Book";

describe("Book Overview Container", () => {
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
  const history = createMemoryHistory();
  const path = `/route/:id`;
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(":id", "1"),
    params: { id: "1" },
  };
  const location = createLocation(match.url);

  it("renders without crashing", async () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(
      <BookOverviewContainer
        bookService={bookServiceMock}
        history={history}
        location={location}
        match={match}
      />,
      div,
    );

    await Promise.resolve();

    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("change path after row click", async () => {
    // given
    history.push = jest.fn();
    const wrapper = mount(
      <BookOverviewContainer
        bookService={bookServiceMock}
        history={history}
        location={location}
        match={match}
      />,
    );
    expect(wrapper.state()).toStrictEqual({ books: [] });

    // pause the test and let the event loop cycle so the callback
    // queued by then() within componentDidMount can run
    await Promise.resolve();

    wrapper.update();
    expect(wrapper.state()).toStrictEqual({ books: [...books] });

    expect(wrapper.state()).toStrictEqual({ books: [...books] });
    wrapper.update();
    const johnExampleRow = wrapper.find("table tbody tr").at(0);
    // when
    johnExampleRow.simulate("click");
    // then
    expect(history.push).toHaveBeenCalled();
  });
});
