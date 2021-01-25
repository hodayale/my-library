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
import booksLoanedJSON from './data/booksLoaned.json';
import booksOwnedJSON from './data/booksOwned.json';
import booksReadJSON from './data/booksRead.json';
import booksWantToOwnJSON from './data/booksWantToOwn.json';
import booksWantToReadJSON from './data/booksWantToRead.json';

function App() {
  const [activeUser, setactiveUser] = React.useState({
                                      id: 1,
                                      fname: "הודיה",
                                      lname: "לוי",
                                      email: "hodayale@gmail.com",
                                      password: "hodi1234",
                                      phone: "",
                                      booksOwned: "1,2,3,5,6",
                                      booksRead: "1,2,3",
                                      booksWantToRead: "4,5,6",
                                      booksWantToOwn: "4",
                                      booksLoaned: "6"
                                    });
  
  const [filter, setfilter] = React.useState('');

  // All Books state
  //***********************************************
  let books;
  if(localStorage.getItem('booksJSON')) {
    books = JSON.parse(localStorage.getItem('booksJSON'));
  }else {
    books = booksJSON;
  }

  const [allBooks, setallBooks] = React.useState(books);

  // Books Loaned state
  //***********************************************
  let booksLoaned;
  if(localStorage.getItem('booksLoanedJSON')) {
    booksLoaned = JSON.parse(localStorage.getItem('booksLoanedJSON'));
  }else {
    booksLoaned = booksLoanedJSON;
  }

  const [allBooksLoaned, setallBooksLoaned] = React.useState(booksLoaned);

  // Books Owned state
  //***********************************************
  let booksOwned;
  if(localStorage.getItem('booksOwnedJSON')) {
    booksOwned = JSON.parse(localStorage.getItem('booksOwnedJSON'));
  }else {
    booksOwned = booksOwnedJSON;
  }

  const [allBooksOwned, setallBooksOwned] = React.useState(booksOwned);

  // Books Read state
  //***********************************************
  let booksRead;
  if(localStorage.getItem('booksReadJSON')) {
    booksRead = JSON.parse(localStorage.getItem('booksReadJSON'));
  }else {
    booksRead = booksReadJSON;
  }

  const [allBooksRead, setallBooksRead] = React.useState(booksRead);

  // Books WantToOwn state
  //***********************************************
  let booksWantToOwn;
  if(localStorage.getItem('booksWantToOwnJSON')) {
    booksWantToOwn = JSON.parse(localStorage.getItem('booksWantToOwnJSON'));
  }else {
    booksWantToOwn = booksWantToOwnJSON;
  }

  const [allBooksWantToOwn, setallBooksWantToOwn] = React.useState(booksWantToOwn);

  // Books WantToRead state
  //***********************************************
  let booksWantToRead;
  if(localStorage.getItem('booksWantToReadJSON')) {
    booksWantToRead = JSON.parse(localStorage.getItem('booksWantToReadJSON'));
  }else {
    booksWantToRead = booksWantToReadJSON;
  }

  const [allBooksWantToRead, setallBooksWantToRead] = React.useState(booksWantToRead);

  let users;
  if(localStorage.getItem('usersJSON')) {
    users = JSON.parse(localStorage.getItem('usersJSON'));
  }else {
    users = usersJSON;
  }

  const [allUsers, setallUsers] = React.useState(users);
  

  const handleFilter = (e) => {
    setfilter(e.target.value);
  }

  const handleLogin = (userObj) => {
    setactiveUser(userObj);
  }

  const handleLogout = () => {
    setactiveUser(null);
  }

  const addBook = (bookObj) => {
    setallBooks(allBooks.concat(bookObj));
    localStorage.setItem('booksJSON', JSON.stringify(allBooks.concat(bookObj)));
  } 

  const updateBook = (bookObj) => {
    let objIndex = allBooks.findIndex((obj => obj.id == bookObj.id));
    let books = [...allBooks];  //shallow copy of allBooks
    books[objIndex] = bookObj;
    setallBooks(books);
    localStorage.setItem('booksJSON', JSON.stringify(books));
  }

  const addUser = (userObj) => {
    setallUsers(allUsers.concat(userObj));
    localStorage.setItem('usersJSON', JSON.stringify(allUsers.concat(userObj)));
  }

  return (
    <HashRouter>
      <Route exact path={['/', '/books', '/addBook']}>
        <MyLibraryNavbar logo={logo} activeUser={activeUser} handleLogout={handleLogout} users={usersJSON} handleLogin={handleLogin} handleFilter={handleFilter}/>
      </Route>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage activeUser={activeUser} books={allBooks} filter={filter} />
          </Route>
          <Route exact path="/signup">
            <SignupPage activeUser={activeUser}/>
          </Route>
          <Route exact path="/books">
            <BooksPage activeUser={activeUser} books={allBooks} filter={filter} 
                        booksOwned={allBooksOwned} booksRead={allBooksRead} booksWantToRead={allBooksWantToRead} 
                        booksWantToOwn={allBooksWantToOwn} booksLoaned={allBooksLoaned}/>
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
