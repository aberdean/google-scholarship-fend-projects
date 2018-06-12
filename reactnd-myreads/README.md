# MyReads Project

This app allows you to keep track of your reading.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [What You're Getting](#what-you're-getting)
- [Backend Server](#backend-server)
- [Search Terms](#search-terms)
- [Credits](#credits)

## Description

On the main page, you'll find three bookshelves, one for the books you're
currently reading, one for the books you're planning to read, and one for the
books you've already read.

There is also a search function that allows you to search for new books to add
to your shelves and, of course, you can move your books from one shelf to
another whenever you need.

## Installation

To run the project:

* Clone or download this repository
* On the terminal or command line, type `npm install` to install all dependencies
* Type `npm start` to launch the app on your browser

## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms that can be used with the app.
├── package.json # npm package manager file.
├── public
│   ├── cover-not-available.png
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css
    ├── index.js
    ├── ListBooks.js
    ├── SearchBooks.js
    └── SingleBook.js
```

## Backend Server

The project includes a backend server provided by Udacity. The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on
the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of
book objects.
* This collection represents the books currently in the bookshelves of the app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"] 
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a
maximum of 20 book objects.

## Search Terms
The backend API uses a fixed set of cached search results and is limited to a
particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with
the backend.

## Credits
The starter code for this project was provided by [Udacity](https://github.com/udacity/reactnd-project-myreads-starter).
