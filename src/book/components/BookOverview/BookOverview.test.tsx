import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { BookOverview } from "./BookOverview";
import { BookContext } from "../../services/BooksService";

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
const setupWrapper = () => {
  return mount(<BookOverview />, {
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

  it("renders details upon click on the row", async () => {
    // given
    const wrapper = setupWrapper();
    // when
    await act(async () => {
      await jest.runAllImmediates();
      wrapper.update();
    });
    const johnExampleRow = wrapper.find("table tbody tr").at(0);
    // when
    johnExampleRow.simulate("click");
    // then
    const bookDetails = wrapper.find("div.row > div").at(1);

    const authors = bookDetails.find("input#authors");
    const title = bookDetails.find("input#title");
    expect(authors.prop("value")).toBe(books[0].authors);
    expect(title.prop("value")).toBe(books[0].title);
  });
});
