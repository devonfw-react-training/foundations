import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { BookDetails } from "./BookDetails";

describe("Book Details Component", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookDetails />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a book as its state", () => {
    // when
    const wrapper = shallow(<BookDetails />);
    // then
    expect(wrapper).toHaveState({
      currentBook: {
        id: 1,
        title: "Example Book",
        authors: "John Example",
      },
    });
  });

  it("renders authors with a label", () => {
    // when
    const wrapper = shallow(<BookDetails />);
    // then
    const label = wrapper.find('label[htmlFor="authors"]');
    const authors = wrapper.find("p#authors");
    expect(label).toHaveText("Authors:");
    expect(authors).toHaveText("John Example");
  });

  it("renders a title with a label", () => {
    // when
    const wrapper = shallow(<BookDetails />);
    // then
    const label = wrapper.find('label[htmlFor="title"]');
    const title = wrapper.find("p#title");
    expect(label).toHaveText("Title:");
    expect(title).toHaveText("Example Book");
  });
});
