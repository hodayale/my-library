import { Container } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import MyLibraryNavbar from './components/MyLibraryNavbar';
import AddBookPage from './pages/AddBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import BooksPage from './pages/BooksPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SinupPage';
import logo from './icons/love-book.svg';
import React from 'react';
import usersJSON from './data/users.json';
import booksJSON from './data/books.json';

function App() {
  const [activeUser, setactiveUser] = React.useState(null);
  const [allBooks, setallBooks] = React.useState(booksJSON);
  const [filter, setfilter] = React.useState('');

  const handleFilter = (e) => {
    setfilter(e.target.value);
  }

  const handleLogin = (userObj) => {
    setactiveUser(userObj);
  }

  const handleLogout = () => {
    setactiveUser(null);
  }

  return (
    <HashRouter>
      <Route exact path={['/', '/books', '/addBook']}>
        <MyLibraryNavbar logo={logo} activeUser={activeUser} handleLogout={handleLogout} users={usersJSON} handleLogin={handleLogin} handleFilter={handleFilter}/>
      </Route>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage books={allBooks} filter={filter}/>
          </Route>
          <Route exact path="/signup">
            <SignupPage activeUser={activeUser}/>
          </Route>
          <Route exact path="/books">
            <BooksPage activeUser={activeUser}/>
          </Route>
          <Route exact path="/books/:bookId">
            <BookDetailsPage activeUser={activeUser}/>
          </Route>
          <Route exact path="/addBook">
            <AddBookPage activeUser={activeUser}/>
          </Route>
        </Switch>
      </Container>
    </HashRouter>
  );
}

export default App;
