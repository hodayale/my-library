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
import users from './data/users.json';

function App() {
  const [activeUser, setactiveUser] = React.useState(null);

  const handleLogin = (userObj) => {
    setactiveUser(userObj);
  }

  const handleLogout = () => {
    setactiveUser(null);
  }

  return (
    <HashRouter>
      <Route exact path={['/', '/books', '/addBook']}>
        <MyLibraryNavbar logo={logo} activeUser={activeUser} handleLogout={handleLogout} users={users} handleLogin={handleLogin}/>
      </Route>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage/>
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
