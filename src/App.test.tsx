import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { shallow } from "enzyme";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders 'Hello World' in <h1>", () => {
    const wrapper = shallow(<App />);
    const welcome = wrapper.find("h1");
    expect(welcome).toHaveText("Hello World!");
  });
});
