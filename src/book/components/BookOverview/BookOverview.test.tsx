import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { BookOverview } from "./BookOverview";
import { Book } from "../../Book";

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

  let bookServiceMockPromise: Promise<Book[]>;
  const bookServiceMock = {
    findAll() {
      bookServiceMockPromise = Promise.resolve(books);
      return bookServiceMockPromise;
    },
  };

  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<BookOverview bookService={bookServiceMock} />, div);
    return bookServiceMockPromise.then(() => {
      // make sure assertions are done AFTER the state is updated
      // then no errors thrown
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("sets the books after mounting", () => {
    // given
    expect.hasAssertions();
    // when
    const wrapper = shallow(<BookOverview bookService={bookServiceMock} />);
    return bookServiceMockPromise.then(() => {
      // make sure assertions are done AFTER the state is updated
      // then
      expect(wrapper).toHaveState("books", books);
    });
  });

  it("renders the master table", () => {
    // given
    expect.hasAssertions();
    // when
    const wrapper = shallow(<BookOverview bookService={bookServiceMock} />);
    return bookServiceMockPromise.then(() => {
      // then
      const masterTable = wrapper.find("table");
      expect(masterTable).toExist();
    });
  });

  it("renders the master table having three columns", () => {
    // given
    expect.hasAssertions();
    // when
    const wrapper = shallow(<BookOverview bookService={bookServiceMock} />);
    return bookServiceMockPromise.then(() => {
      // then
      const masterTable = wrapper.find("table");
      const columns = masterTable.find("thead tr th");
      expect(columns).toHaveLength(3);
      expect(columns.at(0)).toHaveText("#");
      expect(columns.at(1)).toHaveText("Authors");
      expect(columns.at(2)).toHaveText("Title");
    });
  });

  it("renders the master table rows", () => {
    // given
    expect.hasAssertions();
    // when
    const wrapper = shallow(<BookOverview bookService={bookServiceMock} />);
    return bookServiceMockPromise.then(() => {
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
  });

  it("calls back upon click on the row", () => {
    // given
    expect.hasAssertions();
    const callbackMock = jest.fn();
    const wrapper = shallow(
      <BookOverview
        bookService={bookServiceMock}
        onBookSelection={callbackMock}
      />,
    );
    return bookServiceMockPromise.then(() => {
      const johnExampleRow = wrapper.find("table tbody tr").at(0);
      // when
      johnExampleRow.simulate("click");
      // then
      expect(callbackMock).toHaveBeenCalledWith(books[0]);
    });
  });
});
