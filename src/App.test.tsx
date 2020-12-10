import React from "react";
import ReactDOM from "react-dom";
import { App, NavBar, Routes } from "./App";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import { BookOverviewContainer } from "./book/components/BookOverview/BookOverviewContainer";
import { BookDetailsContainer } from "./book/components/BookDetails/BookDetailsContainer";
import { NavLink } from "react-router-dom";

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
        <App />
      </MemoryRouter>,
    );

    expect(wrapper.find(BookOverviewContainer)).toHaveLength(1);
    expect(wrapper.find(BookDetailsContainer)).toHaveLength(0);
  });

  it("should navigate to new Book page after clicking NEW BOOK link", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/book-app/books"]}>
        <Routes />
      </MemoryRouter>,
    );

    expect(wrapper.find(BookDetailsContainer)).toHaveLength(0);

    const newBookLink = wrapper
      .find(NavLink)
      .findWhere((c) => c.text() === "New Book")
      .first();
    newBookLink.simulate("click", { button: 0 });

    expect(wrapper.find(BookDetailsContainer)).toHaveLength(1);
  });
});
