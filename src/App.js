
import React from 'react';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import { Route, Link } from 'react-router-dom';
import './App.css';
class BooksApp extends React.Component {
  state = {books: [],searchedBooks: [],isLoading: true,
  }
 fetch() {
    BooksAPI.getAll().then( books => {
      this.setState({
        books,
        isLoading: false,
      })
    });
 }

 componentDidMount() {
 	this.fetch();
 }

  search = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then( searchedBooks => {
        let searchResult = [];
          for (const serachedBook of searchedBooks) {
            for (const book of this.state.books) {
                if (serachedBook.id === book.id) {
                  serachedBook.shelf = book.shelf
                }
            }
            searchResult.push(serachedBook)
          }
          return searchResult
      }).then((searchedBooks) => {
        this.setState((prevState) => ({ searchedBooks }))
      }).catch(searchedBooks => this.setState({ searchedBooks: [] }))
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  shelfUp = (addedbook, shelf) => {
    BooksAPI.update(addedbook, shelf).then( response => {
      addedbook.shelf = shelf
      addedBooks.push(addedbook);
        this.setState({ books: addedBooks,searchedBooks: []  })
     
        
    })

    let addedBooks = this.state.books.filter( book => book.id !== addedbook.id )

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <img src="https://i.imgur.com/o7jcAwM.png" />
            </div>
            <div className="list-books-content">
                <Shelf
                  books={this.state.books}
                  shelfUp={this.shelfUp}
                />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={ () => (
          <Search
            searchedBooks={this.state.searchedBooks}
            search={this.search}
            shelfUp={this.shelfUp}
          />
        )}
        />
        </div>
    )
  }
}

export default BooksApp
