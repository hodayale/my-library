import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React from 'react';
import Checkboxes from "../components/Checkboxes";

const BookDetailsPage = (props) => {
    const {activeUser, books, booksOwned, booksRead, booksWantToRead, booksWantToOwn, 
            booksLoaned, addBookOwned, removeBookOwned, addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead, addBookWantToOwn, removeBookWantToOwn,
            removeBookLoaned, updateBookLoaned} = props;
    //const {activeUser, books, bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, bookLoanerName} = props;
    const {bookId} = useParams();

    //get book details by ID
    const selectedBook = books.find((item) => {return item.id == bookId});

    //get if book Owned
    const bookOwned = booksOwned.filter(item => (item.userId === activeUser.id && item.bookId == bookId)).length > 0;
    //get if book read
    const bookRead = booksRead.filter(item => (item.userId === activeUser.id && item.bookId == bookId)).length > 0;
    //get if book want to own
    const bookWantToOwn = booksWantToOwn.filter(item => (item.userId === activeUser.id && item.bookId == bookId)).length > 0;
    //get if book want to read
    const bookWantToRead = booksWantToRead.filter(item => (item.userId === activeUser.id && item.bookId == bookId)).length > 0;
    //get if book loaned
    const bookLoaned = booksLoaned.filter(item => (item.userId === activeUser.id && item.bookId == bookId)).length > 0;

    const bookLoanerName = bookLoaned ? booksLoaned.find(item => {return (item.userId === activeUser.id && item.bookId == bookId)}).nameOfLoaner : "";

    const checkboxs = <Checkboxes bookId={bookId} userId={activeUser.id}
                                  bookOwned={bookOwned} bookRead={bookRead} bookWantToRead={bookWantToRead} 
                                  bookWantToOwn={bookWantToOwn} bookLoaned={bookLoaned} bookLoanerName={bookLoanerName} showLoaned={true}
                                  addBookOwned={addBookOwned} removeBookOwned={removeBookOwned}
                                  addBookRead={addBookRead} removeBookRead={removeBookRead}
                                  addBookWantToRead={addBookWantToRead} removeBookWantToRead={removeBookWantToRead}
                                  addBookWantToOwn={addBookWantToOwn} removeBookWantToOwn={removeBookWantToOwn}
                                  removeBookLoaned={removeBookLoaned} updateBookLoaned={updateBookLoaned}/> ;
    

    return(
        <Container>
            
            <Row className="mt-4">
            <Col sm={3}>
                    <Image  style={{ width: '18rem'}} src={selectedBook.bookCover} rounded/>
                    {activeUser ? checkboxs : ''}
                </Col>
                <Col sm={9}>
                    <h1 className="name-of-book-design">{selectedBook.bookName}</h1>
                    <h4>{selectedBook.auther}</h4>
                    <p><span style={{fontWeight: "bold"}}>שם ההוצאה: </span>{selectedBook.publisher}</p>
                    <p><span style={{fontWeight: "bold"}}>תאריך ההוצאה: </span>{selectedBook.publishDate}</p>
                    <p><span style={{fontWeight: "bold"}}>קטגוריה: </span>{selectedBook.category}</p>
                    <p><span style={{fontWeight: "bold"}}>מס' עמודים: </span>{selectedBook.numPages}</p>
                    <h4>תקציר</h4>
                    <p>{selectedBook.summery}</p>
                </Col>
                
            </Row>
        </Container>
    );
}

export default BookDetailsPage;