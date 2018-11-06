import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
class Shelf {
  constructor(shelfId, shelfName, books) {
    this.shelfName = shelfName;
    this.shelfId = shelfId;
    this.books = books.filter(book => book.shelf === shelfId);}
}
let Home = props => {
  const shelves = [
    new Shelf("currentlyReading", "Currently Reading", props.shelfBooks),
    new Shelf("wantToRead", "Want to read", props.shelfBooks),
    new Shelf("read", "Read", props.shelfBooks)
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(({ shelfName, books }) => (
          <BookShelf
            key={shelfName}
            shelfName={shelfName}
            books={books}
            onBookShelfChange={props.onBookShelfChange}
          />))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>);
};
Home.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired};
export default Home;
