import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
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
    const wrapper = mount(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="authors"]');
    const authors = wrapper.find("input[name='authors']");
    expect(label).toHaveText("Authors:");
    expect(authors.prop("value")).toBe(currentBook.authors);
  });

  it("renders a title with a label", () => {
    // when
    const wrapper = mount(<BookDetails book={currentBook} />);
    // then
    const label = wrapper.find('label[htmlFor="title"]');
    const title = wrapper.find("input[name='title']");
    expect(label).toHaveText("Title:");
    expect(title.prop("value")).toBe(currentBook.title);
  });

  // it("calls back passing updated book upon form submit", () => {
  //   // given
  //   const callbackMock = jest.fn();
  //   const wrapper = mount(
  //     <BookDetails book={currentBook} onBookChange={callbackMock} />,
  //   );
  //   const authors = wrapper.find("input[name='authors']");
  //   const newAuthor = "New Author";
  //   authors.simulate("change", { target: { value: newAuthor } });
  //   const form = wrapper.find("form");
  //   // when
  //   form.simulate("submit", { preventDefault: jest.fn() });
  //   // then
  //   const expectedUpdatedBook = { ...currentBook, authors: newAuthor };
  //   expect(callbackMock).toBeCalledWith(expectedUpdatedBook);
  // });
});
