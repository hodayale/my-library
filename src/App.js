import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import MyLibraryNavbar from './components/MyLibraryNavbar';
import AddBookPage from './pages/AddBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import BooksPage from './pages/BooksPage';
import HomePage from './pages/HomePage';
import logo from './icons/love-book.svg';
import React from 'react';
import usersJSON from './data/users.json';
import booksJSON from './data/books.json';
import booksLoanedJSON from './data/booksLoaned.json';
import booksOwnedJSON from './data/booksOwned.json';
import booksReadJSON from './data/booksRead.json';
import booksWantToOwnJSON from './data/booksWantToOwn.json';
import booksWantToReadJSON from './data/booksWantToRead.json';

// import { AsyncStorage } from 'react';
// import Parse from 'parse/dist/parse.min.js';

function App() {

  // Parse.setAsyncStorage(AsyncStorage);
  //Parse.initialize("Cf54cNRullXWYSWiG3S2BtOa84LPT6se5jNFhG9f","cuIZh1lLXdxzoQtCzk8ZrXQze9ErEjIvUgdY8oUI"); 
  // Parse.initialize('Cf54cNRullXWYSWiG3S2BtOa84LPT6se5jNFhG9f', 'cuIZh1lLXdxzoQtCzk8ZrXQze9ErEjIvUgdY8oUI', 'olJsROvoxNV3BbqSBsiX1o5KXnxwx4JoAPDgUE9M');
  // Parse.serverURL = 'https://parseapi.back4app.com/';

  // const MyFirstClass = Parse.Object.extend("MyFirstClass");
  // const myFirstClass = new MyFirstClass();

  // myFirstClass.set("name", "I'm able to save objects!");
  // myFirstClass.save()
  // .then((object) => {
  //   // Success
  //   console.log('New object created with objectId: ' + object.id);
  // }, (error) => {
  //   // Save fails
  //   console.log('Failed to create new object, with error code: ' + error.message);
  // });

  let user;
  if(localStorage.getItem('activeUser')) {
    user = JSON.parse(localStorage.getItem('activeUser'));
  }else {
    user = null;
  }

  const [activeUser, setactiveUser] = React.useState(user);
  
  const [results, setResults] = React.useState([]);

  // All Books state
  //***********************************************
  // const [allBooks, setallBooks] = React.useState([]);
  // const myLibraryBooks = Parse.Object.extend('myLibraryBooks');
  // const query = new Parse.Query(myLibraryBooks);
  // query.find().then((results) => {
  //   console.log(`The books in myLibraryBooks are: ${JSON.stringify(results)}`)
  //   setallBooks(results);
  // });
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
  
  const handleLogin = (userObj, rememberUser = false) => {
    setactiveUser(userObj);
    if(rememberUser){
      localStorage.setItem('activeUser', JSON.stringify(userObj));
    }
  }

  const handleLogout = () => {
    setactiveUser(null);
    localStorage.setItem('activeUser', JSON.stringify(null));
  }

  const addBook = (bookObj) => {
    setallBooks(allBooks.concat(bookObj));
    localStorage.setItem('booksJSON', JSON.stringify(allBooks.concat(bookObj)));
  } 

  // const updateBook = (bookObj) => {
  //   let objIndex = allBooks.findIndex((obj => obj.id == bookObj.id));
  //   if(objIndex !== -1){
  //     let books = [...allBooks];  //shallow copy of allBooks
  //     books[objIndex] = bookObj;
  //     setallBooks(books);
  //     localStorage.setItem('booksJSON', JSON.stringify(books));
  //   }
  // }

  const addUser = (userObj) => {
    setallUsers(allUsers.concat(userObj));
    localStorage.setItem('usersJSON', JSON.stringify(allUsers.concat(userObj)));
  }

  const addBookOwned = (bookOwnObj) => {
    let objIndex = allBooksOwned.findIndex((obj => (obj.bookId == bookOwnObj.bookId && obj.userId === bookOwnObj.userId)));
    if(objIndex === -1){
      setallBooksOwned(allBooksOwned.concat(bookOwnObj));
      localStorage.setItem('booksOwnedJSON', JSON.stringify(allBooksOwned.concat(bookOwnObj)));
    }
  }

  const removeBookOwned = (bookOwnObj) => {
    let objIndex = allBooksOwned.findIndex((obj => (obj.bookId == bookOwnObj.bookId && obj.userId === bookOwnObj.userId)));
    if(objIndex !== -1){
      let booksOwned = [...allBooksOwned];  //shallow copy
      booksOwned.splice(objIndex, 1);
      setallBooksOwned(booksOwned);
      localStorage.setItem('booksOwnedJSON', JSON.stringify(booksOwned));
    }
  }

  const addBookRead = (bookReadObj) => {
    let objIndex = allBooksRead.findIndex((obj => (obj.bookId == bookReadObj.bookId && obj.userId === bookReadObj.userId)));
    if(objIndex === -1){
      setallBooksRead(allBooksRead.concat(bookReadObj));
      localStorage.setItem('booksReadJSON', JSON.stringify(allBooksRead.concat(bookReadObj)));
    }
  }

  const removeBookRead = (bookReadObj) => {
    let objIndex = allBooksRead.findIndex((obj => (obj.bookId == bookReadObj.bookId && obj.userId === bookReadObj.userId)));
    if(objIndex !== -1){
      let booksRead = [...allBooksRead];  //shallow copy
      booksRead.splice(objIndex, 1);
      setallBooksRead(booksRead);
      localStorage.setItem('booksReadJSON', JSON.stringify(booksRead));
    }
  }

  const addBookWantToRead = (bookReadObj) => {
    let objIndex = allBooksWantToRead.findIndex((obj => (obj.bookId == bookReadObj.bookId && obj.userId === bookReadObj.userId)));
    if(objIndex === -1){
      setallBooksWantToRead(allBooksWantToRead.concat(bookReadObj));
      localStorage.setItem('booksWantToReadJSON', JSON.stringify(allBooksWantToRead.concat(bookReadObj)));
    }
  }

  const removeBookWantToRead = (bookWWantToReadObj) => {
    let objIndex = allBooksWantToRead.findIndex((obj => (obj.bookId == bookWWantToReadObj.bookId && obj.userId === bookWWantToReadObj.userId)));
    if(objIndex !== -1){
      let booksWantToRead = [...allBooksWantToRead];  //shallow copy
      booksWantToRead.splice(objIndex, 1);
      setallBooksWantToRead(booksWantToRead);
      localStorage.setItem('booksWantToReadJSON', JSON.stringify(booksWantToRead));
    }
  }

  const addBookWantToOwn = (bookOwnObj) => {
    let objIndex = allBooksWantToOwn.findIndex((obj => (obj.bookId == bookOwnObj.bookId && obj.userId === bookOwnObj.userId)));
    if(objIndex === -1){
      
      setallBooksWantToOwn(allBooksWantToOwn.concat(bookOwnObj));
      localStorage.setItem('booksWantToOwnJSON', JSON.stringify(allBooksWantToOwn.concat(bookOwnObj)));
    }
  }

  const removeBookWantToOwn = (bookOwnObj) => {
    let objIndex = allBooksWantToOwn.findIndex((obj => (obj.bookId == bookOwnObj.bookId && obj.userId === bookOwnObj.userId)));
    if(objIndex !== -1){
      let booksWantToOwn = [...allBooksWantToOwn];  //shallow copy
      booksWantToOwn.splice(objIndex, 1);
      setallBooksWantToOwn(booksWantToOwn);
      localStorage.setItem('booksWantToOwnJSON', JSON.stringify(booksWantToOwn));
    }
  }

  const addBookLoaned = (bookLoanObj) => {
    let objIndex = allBooksLoaned.findIndex((obj => (obj.bookId == bookLoanObj.bookId && obj.userId === bookLoanObj.userId)));
    if(objIndex === -1){
      setallBooksLoaned(allBooksLoaned.concat(bookLoanObj));
      localStorage.setItem('booksLoanedJSON', JSON.stringify(allBooksLoaned.concat(bookLoanObj)));
    }
  }

  const removeBookLoaned = (bookLoanObj) => {
    let objIndex = allBooksLoaned.findIndex((obj => (obj.bookId == bookLoanObj.bookId && obj.userId === bookLoanObj.userId)));
    if(objIndex !== -1){
      let booksLoaned = [...allBooksLoaned];  //shallow copy
      booksLoaned.splice(objIndex, 1);
      setallBooksLoaned(booksLoaned);
      localStorage.setItem('booksLoanedJSON', JSON.stringify(booksLoaned));
    }
  }

  const updateBookLoaned = (bookLoanObj) => {
    let objIndex = allBooksLoaned.findIndex((obj => (obj.bookId == bookLoanObj.bookId && obj.userId === bookLoanObj.userId)));
    if(objIndex === -1){
      addBookLoaned(bookLoanObj)
    } else {
      let booksLoaned = [...allBooksLoaned];  //shallow copy
      booksLoaned[objIndex] = bookLoanObj;
      setallBooksLoaned(booksLoaned);
      localStorage.setItem('booksLoanedJSON', JSON.stringify(booksLoaned));
    }
  }

  const searchBook = (searchText) => {
    if(!searchText) {
        setResults([]);
        return;
    }
    const booksFound = allBooks.filter(book => book.bookName.includes(searchText) || book.auther.includes(searchText))
                              .map((item) => {return {name: item.bookName, auther: item.auther, id: item.id}});
    setResults(booksFound);
  }

  const showSearchResults = (index) => {
      const book = results[index];
      window.location = `#/books/${book.id}`;
      setResults([]);
  }

  return (
    <HashRouter >
      <Route exact path={["/", "/books", "/addBook", "/books/:bookId"]}>
            <MyLibraryNavbar logo={logo} activeUser={activeUser} handleLogout={handleLogout} users={allUsers} 
                              handleLogin={handleLogin} addUser={addUser}
                              results={results} searchBook={searchBook} showSearchResults={showSearchResults}/>
      </Route>
      <Route exact path="/">
            <HomePage activeUser={activeUser} books={allBooks}
                      booksOwned={allBooksOwned} booksRead={allBooksRead} booksWantToRead={allBooksWantToRead} 
                      booksWantToOwn={allBooksWantToOwn} booksLoaned={allBooksLoaned}
                      addBookOwned={addBookOwned} removeBookOwned={removeBookOwned}
                      addBookRead={addBookRead} removeBookRead={removeBookRead}
                      addBookWantToRead={addBookWantToRead} removeBookWantToRead={removeBookWantToRead}
                      addBookWantToOwn={addBookWantToOwn} removeBookWantToOwn={removeBookWantToOwn}
                      addBookLoaned={addBookLoaned} removeBookLoaned={removeBookLoaned} updateBookLoaned={updateBookLoaned}/>
        </Route>
        <Route exact path="/books">
            <BooksPage activeUser={activeUser} books={allBooks}
                        booksOwned={allBooksOwned} booksRead={allBooksRead} booksWantToRead={allBooksWantToRead} 
                        booksWantToOwn={allBooksWantToOwn} booksLoaned={allBooksLoaned}
                        addBookOwned={addBookOwned} removeBookOwned={removeBookOwned}
                        addBookRead={addBookRead} removeBookRead={removeBookRead}
                        addBookWantToRead={addBookWantToRead} removeBookWantToRead={removeBookWantToRead}
                        addBookWantToOwn={addBookWantToOwn} removeBookWantToOwn={removeBookWantToOwn}
                        addBookLoaned={addBookLoaned} removeBookLoaned={removeBookLoaned} updateBookLoaned={updateBookLoaned}/>
        </Route>
        <Route exact path="/books/:bookId">
            <BookDetailsPage activeUser={activeUser} books={allBooks} booksOwned={allBooksOwned} booksRead={allBooksRead} booksWantToRead={allBooksWantToRead} 
                             booksWantToOwn={allBooksWantToOwn} booksLoaned={allBooksLoaned}
                             addBookOwned={addBookOwned} removeBookOwned={removeBookOwned}
                             addBookRead={addBookRead} removeBookRead={removeBookRead}
                             addBookWantToRead={addBookWantToRead} removeBookWantToRead={removeBookWantToRead}
                             addBookWantToOwn={addBookWantToOwn} removeBookWantToOwn={removeBookWantToOwn}
                             addBookLoaned={addBookLoaned} removeBookLoaned={removeBookLoaned} updateBookLoaned={updateBookLoaned}/>
        </Route>
        <Route exact path="/addBook">
            <AddBookPage activeUser={activeUser} books={allBooks} addBook={addBook}/>
        </Route>
    </HashRouter>
  );
}

export default App;
