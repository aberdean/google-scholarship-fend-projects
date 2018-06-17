import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

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
