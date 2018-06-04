import React, { Component } from 'react'
import SingleBook from './SingleBook'

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.filter((book) => (book.shelf === 'reading'))
                                 .map((book) => (
                  <SingleBook book={book} />
                ))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.filter((book) => (book.shelf === 'toread'))
                                 .map((book) => (
                  <SingleBook book={book} />
                ))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.filter((book) => (book.shelf === 'read'))
                                 .map((book) => (
                  <SingleBook book={book} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
