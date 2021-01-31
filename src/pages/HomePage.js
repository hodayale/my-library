import { Col, Form, Jumbotron, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import React from 'react';

const HomePage = (props) => {
    const {activeUser, books, filter, booksOwned, booksRead, booksWantToRead, 
            booksWantToOwn, booksLoaned,
            addBookOwned, removeBookOwned,
            addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead,
            addBookWantToOwn, removeBookWantToOwn,
            removeBookLoaned, updateBookLoaned} = props;
    const [sortOption, setSortOption] = React.useState("לפי שם הספר (א -> ת)");

    if(sortOption === "לפי שם הספר (א -> ת)"){
        books.sort((a,b) => (a.bookName > b.bookName) ? 1 : ((b.bookName > a.bookName) ? -1 : 0));
    } else if(sortOption === "לפי שם הספר (ת -> א)"){
        books.sort((a,b) => (a.bookName < b.bookName) ? 1 : ((b.bookName < a.bookName) ? -1 : 0));
    } else if(sortOption === "לפי שם המחבר (א -> ת)"){
        books.sort((a,b) => (a.auther > b.auther) ? 1 : ((b.auther > a.auther) ? -1 : 0));
    } else if(sortOption === "לפי שם המחבר (ת -> א)"){
        books.sort((a,b) => (a.auther < b.auther) ? 1 : ((b.auther < a.auther) ? -1 : 0));
    }
    
    //books.sort((a,b) => (a.bookName > b.bookName) ? 1 : ((b.bookName > a.bookName) ? -1 : 0));
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

    const handlChangeSort = (e) => {
        setSortOption(e.target.value);
    }
    
    return(
        <div>
            <Jumbotron className="text-center">
                <h1 className="logo-design text-danger">ברוכים הבאים לספריה הביתית שלכם</h1>
                <h4>כאן תוכלו לנהל את הספרים שיש לכם בבית</h4>
            </Jumbotron>
            <Row className="mb-4">
                <Col sm={4} className="text-align-end mt-1">
                    <Form.Label>מיין</Form.Label>
                </Col>
                <Col sm={4}>
                    <Form.Control as="select" onChange={handlChangeSort} value={sortOption}>
                        <option>לפי שם הספר (א -> ת)</option>
                        <option>לפי שם הספר (ת -> א)</option>
                        <option>לפי שם המחבר (א -> ת)</option>
                        <option>לפי שם המחבר (ת -> א)</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {booksCards}
            </Row>
        </div>
    );
}

export default HomePage;