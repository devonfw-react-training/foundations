import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { BookDetails } from "./BookDetails";

describe("Book Details Component", () => {
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };

  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookDetails book={currentBook} />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders authors with a label", () => {
    // when
    const wrapper = shallow(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="authors"]');
    const authors = wrapper.find("p#authors");
    expect(label).toHaveText("Authors:");
    expect(authors).toHaveText("John Example");
  });

  it("renders a title with a label", () => {
    // when
    const wrapper = shallow(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="title"]');
    const title = wrapper.find("p#title");
    expect(label).toHaveText("Title:");
    expect(title).toHaveText("Example Book");
  });
});
