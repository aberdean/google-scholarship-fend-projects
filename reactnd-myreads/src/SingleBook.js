import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SingleBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

	render() {
    const { book, onChangeShelf } = this.props
    let backgroundImg = book.imageLinks ? `url(${book.imageLinks.thumbnail})`
                                          : 'url("/cover-not-available.png")'

		return (
      <div key={book.id} className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{backgroundImage: `${backgroundImg}` }} />
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : "none"}
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
        <div className="book-title">
          {book.title ? book.title : 'Title not Available'}
        </div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'Author not available'}
        </div>
      </div>
		)
	}
}

export default SingleBook
