import React from "react";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import styles from "./App.module.scss";

export const App = () => (
  <div className={styles.container}>
    <BookOverview />
  </div>
);
