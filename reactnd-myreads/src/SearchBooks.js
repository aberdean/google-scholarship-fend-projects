import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SingleBook from './SingleBook'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({ query: query })
      BooksAPI.search(query.trim()).then((books) => {
        if (books.length > 0) {
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
          <Link className="close-search" to="/">Close</Link>
          
          <div className="search-books-input-wrapper">
            
            <input type="text" 
                   placeholder="Search by title or author"
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
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
