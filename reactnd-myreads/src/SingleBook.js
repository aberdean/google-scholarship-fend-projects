import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * The component to represent a single book. Retrieve info about the book and
 * listen to changes to the assigned shelf.
 */
class SingleBook extends Component {
  static propTypes = {
    /** A single book */
    book: PropTypes.object.isRequired,
    /** Signal when a book's shelf needs to be updated */
    onChangeShelf: PropTypes.func.isRequired
  }

	render() {
    const { book, onChangeShelf } = this.props
    {/** Set the book cover image, or the default image if a cover image is
      * not available.
      */}
    let backgroundImg = book.imageLinks ? `url(${book.imageLinks.thumbnail})`
                                          : 'url("/cover-not-available.png")'

		return (
      <div key={book.id} className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{backgroundImage: `${backgroundImg}` }} />
          <div className="book-shelf-changer">
            {/** Highlight the current book's shelf if one is selected,
               * otherwise don't highlight any.
               */}
            <select value={book.shelf ? book.shelf : "none"}
                    {/** When the user selects a new shelf for a book,
                       * signal the event to the main app component.
                       */}
                    onChange={(event) =>
                                      onChangeShelf(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {/** Display the book title, or state that no title is available */}
        <div className="book-title">
          {book.title ? book.title : 'Title not Available'}
        </div>
        {/** Diplay the book's author(s), or state that no author is available */}
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'Author not available'}
        </div>
      </div>
		)
	}
}

export default SingleBook
