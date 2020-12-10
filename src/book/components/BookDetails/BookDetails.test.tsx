import React from "react";
import { createLocation, createMemoryHistory } from "history";
import { match } from "react-router-dom";
import { BookDetails } from "./BookDetails";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import * as hook from "../../services/BooksService";
import { BookService } from "../../services/BooksService";
import { act } from "react-dom/test-utils";
import { Book } from "../../Book";

configure({ adapter: new Adapter() });

describe("Book Details Component", () => {
  let wrapper: ReactWrapper | ShallowWrapper;
  const currentBook = {
    id: 1,
    title: "Example Book",
    authors: "John Example",
  };

  const path = `/book-app/book/:id?`;
  const match: match<{ id?: string }> = {
    isExact: false,
    path,
    url: path.replace(":id", "1"),
    params: {},
  };
  let savePromise: Promise<Book>;
  const mockService = {
    findOne: () => Promise.resolve(currentBook),
    save: (book: Book) => {
      savePromise = Promise.resolve(book)
      return savePromise;
    },
  } as any as BookService;

  jest.spyOn(hook, "useBookService").mockImplementation(() => {
    return mockService;
  });

  const history = createMemoryHistory();
  const location = createLocation(match.url);

  it("initializes the state when the id is not present", () => {
    // when
    wrapper = shallow(<BookDetails history={history} location={location} match={match} />);

    // then
    expect(wrapper.find("input[id=\"authors\"]").prop("value")).toEqual("");
    expect(wrapper.find("input[id=\"authors\"]").prop("value")).toEqual("");
  });

  it("renders authors with a label", async () => {
    // given
    match.params.id = "100";

    // when
    await act(async () => {
      wrapper = mount(<BookDetails history={history} location={location} match={match} />);
    });

    wrapper.update();
    // then
    const label = wrapper.find("label[htmlFor=\"authors\"]");
    const authors = wrapper.find("input#authors");
    expect(label).toHaveText("Authors:");
    expect(authors.prop("value")).toBe(currentBook.authors);
  });

  it("calls back passing updated book upon form submit", async () => {
    // given
    const saveMethod = jest.spyOn(hook.useBookService(), 'save');
    const historyMock = { push: jest.fn() } as any;
    // when
    await act(async () => {
      wrapper = mount(<BookDetails history={historyMock} location={location} match={match} />);
    });
    wrapper.update();
    const title = wrapper.find("input#authors");
    const newAuthor = "New Author";
    title.simulate("change", { target: { value: newAuthor } });
    const form = wrapper.find("form");

    // when
    form.simulate("submit", { preventDefault: jest.fn() });

    await savePromise;
    // then

    const expectedUpdatedBook = { ...currentBook, authors: newAuthor };
    expect(saveMethod).toBeCalledWith(expectedUpdatedBook);
    expect(historyMock.push).toBeCalled();
  });
});
