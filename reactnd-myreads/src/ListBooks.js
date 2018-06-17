import React, { Component } from 'react'
import SingleBook from './SingleBook'
import PropTypes from 'prop-types'

/**
 * The component for the list of books to display on the home page.
 * Arrange the books into shelves.
 */
class ListBooks extends Component {
  static propTypes = {
    /** The books to be displayed on the home page */
    books: PropTypes.array.isRequired,
    /** The function to update the book shelf when the user select a new shelf */
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    {/** The names of the shelves in the book object */}
    const shelves = ['currentlyReading', 'wantToRead', 'read']
    {/** The names of the shelves to be displayed on the home page */}
    const shelfTitles = ['Currently Reading', 'Want to Read', 'Read']

    const { books, onChangeShelf } = this.props

    return (
      <div className="list-books-content">
        <div>
          {/** Display the books on the appropriate shelf */}
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
