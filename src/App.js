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

function App() {
  return (
    <HashRouter>
      <Route exact path={['/', '/books', '/addBook']}>
        <MyLibraryNavbar logo={logo}/>
      </Route>
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route exact path="/signup">
            <SignupPage/>
          </Route>
          <Route exact path="/books">
            <BooksPage/>
          </Route>
          <Route exact path="/books/:bookId">
            <BookDetailsPage/>
          </Route>
          <Route exact path="/addBook">
            <AddBookPage/>
          </Route>
        </Switch>
      </Container>
    </HashRouter>
  );
}

export default App;
