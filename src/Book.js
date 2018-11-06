import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  onBookShelfChange = event => {
    let shelf = event.target.value;
    if (shelf === "none") shelf = null;
    this.props.onBookShelfChange(this.props.book, event.target.value);
  };

  render() {
    const { title, authors, previewLink, imageLinks, shelf } = this.props.book;
    const thumbnail = imageLinks ? imageLinks.smallThumbnail : null;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <a
              className="book-cover"
              style={{
                backgroundImage: `url(${thumbnail})`
              }}
              href={previewLink}
              target="_blank"
            />
            <div className="book-shelf-changer">
              <select
                value={shelf ? shelf : "none"}
                onChange={this.onBookShelfChange}
              >
                <option value="" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <ul className="book-authors">
            {authors && authors.map(author => <li key={author}>{author}</li>)}
          </ul>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
};

export default Book;
