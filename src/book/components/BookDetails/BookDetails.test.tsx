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

  it("initializes the state from props", () => {
    // when
    const wrapper = shallow(<BookDetails book={currentBook} />);
    // then
    expect(wrapper).toHaveState(currentBook);
  });

  it("renders authors with a label", () => {
    // when
    const wrapper = shallow(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="authors"]');
    const authors = wrapper.find("input#authors");
    expect(label).toHaveText("Authors:");
    expect(authors.prop("value")).toBe(currentBook.authors);
  });

  it("renders a title with a label", () => {
    // when
    const wrapper = shallow(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="title"]');
    const title = wrapper.find("input#title");
    expect(label).toHaveText("Title:");
    expect(title.prop("value")).toBe(currentBook.title);
  });

  it("updates the state upon input change", () => {
    // given
    const wrapper = shallow(<BookDetails book={currentBook} />);
    const title = wrapper.find("input#authors");
    const newAuthor = "New Author";
    // when
    title.simulate("change", { target: { value: newAuthor } });
    // then
    expect(wrapper).toHaveState("authors", newAuthor);
  });

  it("calls back passing updated book upon form submit", () => {
    // given
    const callbackMock = jest.fn();
    const wrapper = shallow(
      <BookDetails book={currentBook} onBookChange={callbackMock} />,
    );
    const title = wrapper.find("input#authors");
    const newAuthor = "New Author";
    title.simulate("change", { target: { value: newAuthor } });
    const form = wrapper.find("form");
    // when
    form.simulate("submit", { preventDefault: jest.fn() });
    // then
    const expectedUpdatedBook = { ...currentBook, authors: newAuthor };
    expect(callbackMock).toBeCalledWith(expectedUpdatedBook);
  });
});
