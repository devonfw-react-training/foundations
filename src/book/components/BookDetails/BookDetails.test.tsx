import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { BookDetails } from "./BookDetails";
import { Book, BookProperties } from "../../Book";

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
    // given
    const wrapper = mount(<BookDetails book={currentBook} />);
    // when
    wrapper.update();
    // then
    const label = wrapper.find('label[htmlFor="authors"]');
    const authors = wrapper.find('input[name="authors"]');
    expect(label).toHaveText("Authors:");
    expect(authors.prop("value")).toBe(currentBook.authors);
  });

  it("renders a title with a label", () => {
    // given
    const wrapper = mount(<BookDetails book={currentBook} />);
    // when
    wrapper.update();
    // then
    const label = wrapper.find('label[htmlFor="title"]');
    const title = wrapper.find('input[name="title"]');
    expect(label).toHaveText("Title:");
    expect(title.prop("value")).toBe(currentBook.title);
  });

  it("calls back passing updated book upon form submit", () => {
    // given
    expect.hasAssertions();
    const onBookChangeSpy = jest.fn((book: Book | BookProperties) =>
      Promise.resolve(book),
    );
    const onBookChangeAsyncTest = asyncTestFor(onBookChangeSpy);
    const wrapper = mount(
      <BookDetails
        book={currentBook}
        onBookChange={onBookChangeAsyncTest.getFn()}
      />,
    );
    const form = wrapper.find("form");
    // when
    form.simulate("submit", { preventDefault: jest.fn() });

    return onBookChangeAsyncTest.afterFnHaveBeenCalled().then(() => {
      // then
      expect(onBookChangeSpy).toBeCalledWith(currentBook);
    });
  });
});

export function asyncTestFor(fn: (...args: any[]) => Promise<any>) {
  let fnPromise: Promise<any> | undefined;
  let notifyOnFnAlreadyCalled: (() => void) | undefined;

  return {
    getFn() {
      return (...args: any[]): Promise<any> => {
        return (fnPromise = fn
          .apply(null, args)
          .then((fnPromiseResult: any) => {
            if (notifyOnFnAlreadyCalled) {
              notifyOnFnAlreadyCalled();
            }
            return fnPromiseResult;
          }));
      };
    },

    afterFnHaveBeenCalled(): Promise<any> {
      return new Promise((resolve) => (notifyOnFnAlreadyCalled = resolve)).then(
        () => fnPromise,
      );
    },
  };
}
