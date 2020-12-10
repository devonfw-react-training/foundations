import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { match } from "react-router-dom";
import { BookOverview } from "./BookOverview";
import { BookContext } from "../../services/BooksService";
import { createLocation, createMemoryHistory } from "history";

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

const bookServiceMock = {
  findAll: () => Promise.resolve(books),
};
const history = createMemoryHistory();
const setupWrapper = () => {
  const path = `/book-app/books`;
  const match: match = {
    isExact: false,
    path,
    url: path,
    params: {},
  };
  const location = createLocation(match.url);
  return mount(<BookOverview history={history} location={location} match={match}/>, {
    wrappingComponent: BookContext.Provider,
    wrappingComponentProps: {
      value: bookServiceMock,
    },
  });
};

describe("Book Overview Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("renders the master table", async () => {
    // given
    const wrapper = setupWrapper();
    // when
    await act(async () => {
      await jest.runAllImmediates();
      wrapper.update();
    });
    // then
    const masterTable = wrapper.find("table");
    expect(masterTable).toExist();
  });

  it("renders the master table having three columns", async () => {
    // given
    const wrapper = setupWrapper();
    // when
    await act(async () => {
      await jest.runAllImmediates();
      wrapper.update();
    });
    // then
    const masterTable = wrapper.find("table");
    const columns = masterTable.find("thead tr th");
    expect(columns).toHaveLength(3);
    expect(columns.at(0)).toHaveText("#");
    expect(columns.at(1)).toHaveText("Authors");
    expect(columns.at(2)).toHaveText("Title");
  });

  it("renders the master table rows", async () => {
    // given
    const wrapper = setupWrapper();
    // when
    await act(async () => {
      await jest.runAllImmediates();
      wrapper.update();
    });
    // then
    const masterTable = wrapper.find("table");
    const rows = masterTable.find("tbody tr");
    expect(rows).toHaveLength(2);
    const johnExampleRow = rows.at(0);
    const johnExampleAuthorsCell = johnExampleRow.find("td").at(0);
    const johnExampleTitleCell = johnExampleRow.find("td").at(1);
    expect(johnExampleAuthorsCell).toHaveText(books[0].authors);
    expect(johnExampleTitleCell).toHaveText(books[0].title);
  });

  it("change path after row click", async () => {
    // given
    const wrapper = setupWrapper();
    history.push = jest.fn()

    // when
    await act(async () => {
      await jest.runAllImmediates();
      wrapper.update();
    });
    const johnExampleRow = wrapper.find("table tbody tr").at(0);
    // when
    johnExampleRow.simulate("click");

    // then
    // then
    expect(history.push).toHaveBeenCalled();
  });
});
