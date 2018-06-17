import React, { Component } from 'react'
import SingleBook from './SingleBook'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const shelves = ['currentlyReading', 'wantToRead', 'read']
    const shelfTitles = ['Currently Reading', 'Want to Read', 'Read']
    const { books, onChangeShelf } = this.props
    return (
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, index) => {
            return(
              <div key={shelves[index]}className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitles[index]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book) => (
                                      book.shelf === shelf))
                                     .map((book) => (
                      <li key={book.id}>
                        <SingleBook
                          onChangeShelf={onChangeShelf}
                          book={book} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default ListBooks
