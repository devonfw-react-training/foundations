import React from "react";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import styles from "./App.module.scss";

export const App = () => (
  <div className={styles.container}>
    <BookDetails />
  </div>
);
