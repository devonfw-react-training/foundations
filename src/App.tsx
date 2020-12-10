import React from "react";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { BookOverviewContainer } from "./book/components/BookOverview/BookOverviewContainer";
import styles from "./App.module.scss";
import { BooksService } from "./book/services/BooksService";
import { BookDetailsContainer } from "./book/components/BookDetails/BookDetailsContainer";

const bookService = new BooksService();

const NavBar = () => (
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
);

export const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route
        path="/book-app/book/:id?"
        render={(props) => (
          <BookDetailsContainer bookService={bookService} {...props} />
        )}
      />
      <Route
        path="/book-app/books"
        render={(props) => (
          <BookOverviewContainer bookService={bookService} {...props} />
        )}
      />
      <Redirect to="/book-app/books" />
    </Switch>
  </>
);

export const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
