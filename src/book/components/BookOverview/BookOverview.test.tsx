import React from "react";
import ReactDOM from "react-dom";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { BookOverview } from "./BookOverview";

describe("Book Overview Component", () => {
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

  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookOverview />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });

  it("sets the books after mounting", () => {
    // when
    const wrapper = shallow(<BookOverview />);
    // then
    expect(wrapper).toHaveState("books", books);
  });

  it("sets the selectedBook to null after mounting", () => {
    // when
    const wrapper = shallow(<BookOverview />);
    // then
    expect(wrapper).toHaveState("selectedBook", null);
  });

  it("renders the master table", () => {
    // when
    const wrapper = shallow(<BookOverview />);
    // then
    const masterTable = wrapper.find("table");
    expect(masterTable).toExist();
  });

  it("renders the master table having three columns", () => {
    // when
    const wrapper = shallow(<BookOverview />);
    // then
    const masterTable = wrapper.find("table");
    const columns = masterTable.find("thead tr th");
    expect(columns).toHaveLength(3);
    expect(columns.at(0)).toHaveText("#");
    expect(columns.at(1)).toHaveText("Authors");
    expect(columns.at(2)).toHaveText("Title");
  });

  it("renders the master table rows", () => {
    // when
    const wrapper = shallow(<BookOverview />);
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

  it("updates the state upon click on the row", () => {
    // given
    const wrapper = shallow(<BookOverview />);
    const johnExampleRow = wrapper.find("table tbody tr").at(0);
    // when
    johnExampleRow.simulate("click");
    // then
    expect(wrapper).toHaveState("selectedBook", books[0]);
  });

  it("selects a table row upon its click", () => {
    // given
    const wrapper = shallow(<BookOverview />);
    const johnExampleRow = findJohnExampleRowFrom(wrapper);
    // when
    johnExampleRow.simulate("click");
    // then
    expect(findJohnExampleRowFrom(wrapper)).toHaveClassName("table-active");

    function findJohnExampleRowFrom(wrapper: ShallowWrapper<any, any>) {
      return wrapper.find("table tbody tr").at(0);
    }
  });

  it("renders details upon click on the row", () => {
    // given
    const wrapper = mount(<BookOverview />);
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

  it("updates a book row upon changes done in the details", () => {
    // given
    const wrapper = mount(<BookOverview />);
    // select the first row
    const johnExampleRow = findFirstTableRowFrom(wrapper);
    johnExampleRow.simulate("click");
    // update authors in the details
    const bookDetails = wrapper.find("div.row > div").at(1);
    const authors = bookDetails.find("input#authors");
    const newAuthor = "New Author";
    authors.simulate("change", { target: { value: newAuthor } });
    const form = bookDetails.find("form");
    // when
    form.simulate("submit", { preventDefault: jest.fn() });
    // then
    const updatedFirstRow = findFirstTableRowFrom(wrapper);
    const authorsTableCell = updatedFirstRow.find("td").at(0);
    expect(authorsTableCell).toHaveText(newAuthor);

    const titleTableCell = updatedFirstRow.find("td").at(1);
    expect(titleTableCell).toHaveText(books[0].title);

    function findFirstTableRowFrom(wrapper: ReactWrapper) {
      return wrapper.find("table tbody tr").at(0);
    }
  });
});
