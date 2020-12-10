import React from "react";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import styles from "./App.module.scss";
import { BookProvider } from "./book/services/BooksService";

export const App = () => (
  <div className={styles.container}>
    <BookProvider>
      <BookOverview />
    </BookProvider>
  </div>
);
