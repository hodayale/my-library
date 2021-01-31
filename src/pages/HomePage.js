import { Jumbotron, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";

const HomePage = (props) => {
    const {activeUser, books, filter, booksOwned, booksRead, booksWantToRead, 
            booksWantToOwn, booksLoaned,
            addBookOwned, removeBookOwned,
            addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead,
            addBookWantToOwn, removeBookWantToOwn,
            removeBookLoaned, updateBookLoaned} = props;
    const booksCards = books.map((book) => {
        //get if book Owned
        const bookOwned = activeUser ? booksOwned.filter(item => (item.userId === activeUser.id && item.bookId === book.id)).length > 0 : "";
        //get if book read
        const bookRead = activeUser ? booksRead.filter(item => (item.userId === activeUser.id && item.bookId === book.id)).length > 0 : "";
        //get if book want to own
        const bookWantToOwn = activeUser ? booksWantToOwn.filter(item => (item.userId === activeUser.id && item.bookId === book.id)).length > 0 : "";
        //get if book want to read
        const bookWantToRead = activeUser ? booksWantToRead.filter(item => (item.userId === activeUser.id && item.bookId === book.id)).length > 0 : "";
        //get if book loaned
        const bookLoaned = activeUser ? booksLoaned.filter(item => (item.userId === activeUser.id && item.bookId === book.id)).length > 0 : "";
        return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}
                            bookOwned={bookOwned} bookRead={bookRead} bookWantToRead={bookWantToRead} bookWantToOwn={bookWantToOwn} bookLoaned={bookLoaned}
                            addBookOwned={addBookOwned} removeBookOwned={removeBookOwned}
                            addBookRead={addBookRead} removeBookRead={removeBookRead}
                            addBookWantToRead={addBookWantToRead} removeBookWantToRead={removeBookWantToRead}
                            addBookWantToOwn={addBookWantToOwn} removeBookWantToOwn={removeBookWantToOwn}
                            removeBookLoaned={removeBookLoaned} updateBookLoaned={updateBookLoaned}/>
        })
    
    return(
        <div>
            <Jumbotron className="text-center">
                <h1 className="logo-design text-danger">ברוכים הבאים לספריה הביתית שלכם</h1>
                <h4>כאן תוכלו לנהל את הספרים שיש לכם בבית</h4>
            </Jumbotron>

            <Row className="justify-content-center">
                {booksCards}
            </Row>
        </div>
    );
}

export default HomePage;