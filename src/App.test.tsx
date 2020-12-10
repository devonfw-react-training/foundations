import React from "react";
import ReactDOM from "react-dom";
import { App, Routes } from "./App";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import { NavLink } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { BookProvider } from "./book/services/BooksService";

describe("App", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<App />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("initial Path should redirect to Book Details Overview", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <BookProvider>
          <Routes />
        </BookProvider>
      </MemoryRouter>,
    );

    expect(wrapper.find(BookOverview)).toHaveLength(1);
    expect(wrapper.find(BookDetails)).toHaveLength(0);
  });

  it("should navigate to new Book page after clicking NEW BOOK link", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/books"]}>
        <BookProvider>
          <Routes />
        </BookProvider>
      </MemoryRouter>,
    );

    expect(wrapper.find(BookDetails)).toHaveLength(0);

    const newBookLink = wrapper
      .find(NavLink)
      .findWhere((c) => c.text() === "New Book")
      .first();
    newBookLink.simulate("click", { button: 0 });

    expect(wrapper.find(BookDetails)).toHaveLength(1);
  });
});
