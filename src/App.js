import React, { Component } from "react";
import { Route} from "react-router-dom";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import { getAll, update } from "./BooksAPI";
import "./App.css";
class BooksApp extends Component {
  state = {shelfBooks: []};
  componentDidMount() {
    getAll().then(shelfBooks => this.setState({ shelfBooks }));
  }
handleBookShelfChange = (book, shelf) => {
    update(book, shelf).then(() => {
      let shelfBooks = [];
      if (
        shelf &&
        this.state.shelfBooks.filter(currentBook => currentBook.id === book.id)
          .length > 0
      )
        shelfBooks = this.state.shelfBooks.map(
          currentBook =>
            book.id === currentBook.id ? { ...currentBook, shelf } : currentBook
        );
      else if (shelf)
        shelfBooks = [...this.state.shelfBooks, {...book, shelf}]
      else
        shelfBooks = this.state.shelfBooks.filter(
          currentBook => currentBook.id !== book.id
        );
      this.setState({ shelfBooks });
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home
              shelfBooks={this.state.shelfBooks}
              onBookShelfChange={this.handleBookShelfChange}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              shelfBooks={this.state.shelfBooks}
              onBookShelfChange={this.handleBookShelfChange}
            />
          )}
        />
      </div>
    );
  }
}
export default BooksApp;
