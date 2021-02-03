import { Col, Form, Jumbotron, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const HomePage = (props) => {
    const {activeUser, books, booksOwned, booksRead, booksWantToRead, 
            booksWantToOwn, booksLoaned,
            addBookOwned, removeBookOwned,
            addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead,
            addBookWantToOwn, removeBookWantToOwn,
            removeBookLoaned, updateBookLoaned} = props;
    const sortByBookNameAscending = "לפי שם הספר (א -> ת)";
    const sortByBookNameDescending = "לפי שם הספר (ת -> א)";
    const sortByAutherAscending = "לפי שם המחבר (א -> ת)";
    const sortByAutherDescending = "לפי שם המחבר (ת -> א)";
    const [sortOption, setSortOption] = React.useState(sortByBookNameAscending);

    if(sortOption === sortByBookNameAscending){
        books.sort((a,b) => (a.bookName > b.bookName) ? 1 : ((b.bookName > a.bookName) ? -1 : 0));
    } else if(sortOption === sortByBookNameDescending){
        books.sort((a,b) => (a.bookName < b.bookName) ? 1 : ((b.bookName < a.bookName) ? -1 : 0));
    } else if(sortOption === sortByAutherAscending){
        books.sort((a,b) => (a.auther > b.auther) ? 1 : ((b.auther > a.auther) ? -1 : 0));
    } else if(sortOption === sortByAutherDescending){
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
        return <BookCard key={book.id} activeUser={activeUser} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}
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
                <h1 className="text-danger display-3 font-bold">ברוכים הבאים לספר של בית</h1>
                <h4 className="font-bold">כאן תוכלו לנהל את הספרים שיש לכם בבית</h4>
            </Jumbotron>
            <Row className="mb-4">
                <Col lg={4} md={4} sm={6} className="text-align-end mt-1">
                    <Form.Label>מיין</Form.Label>
                </Col>
                <Col lg={4} md={4} sm={6}>
                    <Form.Group className="form-group">
                        <Form.Control className="select" as="select" onChange={handlChangeSort} value={sortOption}>
                                <option>{sortByBookNameAscending}</option>
                                <option>{sortByBookNameDescending}</option>
                                <option>{sortByAutherAscending}</option>
                                <option>{sortByAutherDescending}</option>
                        </Form.Control>
                        <IoIosArrowDown className="img-in-input"/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {booksCards}
            </Row>
            <Row className="footer">
                <p>Copyright: © 2021    Hodaya Levy</p>
            </Row>
        </div>
    );
}

export default HomePage;