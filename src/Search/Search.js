import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { search } from "../BooksAPI";
import Book from "../Book";
class Search extends Component {
  state = {query: "",searchResult: []};
  handleQueryChange = event => {
    this.setState({ query: event.target.value });
    if (event.target.value.length === 0 ) {
      this.setState({ searchResult: [] });
    } else {
      search(event.target.value).then(books =>
        this.setState({ searchResult: books }));}
  };

  render() {
    const bookShelfMap = {};
    this.props.shelfBooks.forEach(book => (bookShelfMap[book.id] = book.shelf));
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.handleQueryChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map(book => (
              <Book
                key={book.id}
                book={{ ...book, shelf: bookShelfMap[book.id] }}
                onBookShelfChange={this.props.onBookShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>);}
}
Search.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
};
export default Search;
