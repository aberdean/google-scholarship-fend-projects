import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
 * Main app component. Track the books to be displayed on the home page
 * and move books from one shelf to another when needed.
 * Route to home page and search page.
 */
class BooksApp extends Component {

  state = {
    /** The current book collection */
    books: []
  }

  /**
   * When the component is mounted, get all books and set the initial state.
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
   * When the user selects a different shelf for a book, update the book's shelf
   * and update the state.
   *
   * @param {object} book The book to be moved to a different shelf
   * @param {string} shelf The new book's shelf
   */
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {/* Render the home page */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks
              books={this.state.books}
              onChangeShelf={this.changeShelf} />

            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        {/* Render the search page */}
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf} />
        )} />
          
      </div>
    )
  }
}

export default BooksApp
