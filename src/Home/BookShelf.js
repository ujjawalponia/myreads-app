import React from "react";
import PropTypes from "prop-types";
import Book from "../Book";
let BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfName}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => (
          <Book
            key={book.id}
            book={book}
            onBookShelfChange={props.onBookShelfChange}
          />
        ))}
      </ol>
    </div>
  </div>
);
BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired};
export default BookShelf;
