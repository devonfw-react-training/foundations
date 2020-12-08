import React, { Component } from "react";
import styles from "./App.module.scss";

interface State {
  title: string;
}

interface Props {}

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { title: "Hello World!" };
  }

  render() {
    return <h1 className={styles.title}>{this.state.title}</h1>;
  }
}
