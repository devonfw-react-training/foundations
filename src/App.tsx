import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom";
import styles from "./App.module.scss";
import { BooksService } from "./book/services/BooksService";
import { BookDetailsRoute } from "./book/components/BookDetails/BookDetailsRoute";
import { BookOverviewRoute } from "./book/components/BookOverview/BookOverviewRoute";

const bookService = new BooksService();

export const App = () => (
  <Router>
    <div>
      <nav className={styles["nav-bar"]}>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to="/book-app/books"
              activeClassName="active"
              className="nav-link"
            >
              Book Overview
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/book-app/book"
              exact
              activeClassName="active"
              className="nav-link"
            >
              New Book
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Redirect exact from="/" to="/book-app/books" />
        <BookOverviewRoute bookService={bookService} />
      </Switch>
      <BookDetailsRoute bookService={bookService} />
    </div>
  </Router>
);
