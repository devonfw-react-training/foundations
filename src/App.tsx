import React from "react";
import { BrowserRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookProvider } from "./book/services/BooksService";
import { BookDetails } from "./book/components/BookDetails/BookDetails";

export const NavBar = () => (
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
      <Route path="/book-app/book/:id?" component={BookDetails} />
      <Route path="/book-app/books" component={BookOverview} />
      <Redirect to="/book-app/books" />
    </Switch>
  </>
);

export const App = () => (
  <BrowserRouter>
    <BookProvider>
      <Routes />
    </BookProvider>
  </BrowserRouter>
);
