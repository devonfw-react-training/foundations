import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    // given
    const div = document.createElement("div");
    // when
    ReactDOM.render(<App />, div);
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div);
  });
});
