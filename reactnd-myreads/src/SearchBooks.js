import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

/**
 * The search page component. Display the list of books matching the user's
 * query. If the query is empty, don't display anything.
 */
class SearchBooks extends Component {
  static propTypes = {
    /**
     * The original books
     */
    books: PropTypes.array.isRequired,
    /**
     * Keep track of when a user changes the self for a book.
     */
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    /** The query the user entered */
    query: '',
    /** The retrieved books for the query */
    books: []
  }

  /**
   * Keep track of the query as it is being entered by the user.
   * Update the list of books retrieved for the query.
   * Set the correct shelf for each retrieved book that is already on a shelf.
   *
   * @param {string} query The query the user entered
   */
  updateQuery = (query) => {
    if (query) {
      this.setState({ query: query })
      BooksAPI.search(query.trim()).then((books) => {
        if (books.length > 0) {
          /* The ids of books that are already on a shelf */
          const originalBooksIds = this.props.books.map((book) => book.id)
          books.map((book) => {
            /*
             * If the retrieved book is already on a shelf, assign it to the
             * correct shelf.
             */
            if (originalBooksIds.indexOf(book.id) >= 0) {
              book.shelf = this.props.books.find(
                (originalBook => originalBook.id === book.id)).shelf
            }
            return book.shelf
          })
          this.setState({ books: books })
        } else {
          this.setState({ books: [] })
        }
      })
    } else {
      this.setState({ query: '', books: [] })
    }
  }

	render() {
    const { onChangeShelf } = this.props
    const { query, books } = this.state

		return(
      <div className="search-books">
        <div className="search-books-bar">
          {/** Return to the home page */}
          <Link className="close-search" to="/">Close</Link>
          {/** Render the search bar */}
          <div className="search-books-input-wrapper">
            <input type="text" 
                   placeholder="Search by title or author"
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
      {/** Render the search results */}
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
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
  }
}

export default SearchBooks
