import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import React from 'react';
import BookCard from "../components/BookCard";

const BooksPage = (props) => {
    const {activeUser, books, filter} = props;
    const [booksToShow, setbooksToShow] = React.useState('');
    

    if(!activeUser) {
        return <Redirect push to="/"/>;
    }

    const handleBooks = (booksIds) => {
        const booksIdArr = booksIds.split(','); 
        
        setbooksToShow(booksIdArr.map((id) => {
            const book = books.filter(book => book.id == id);
            if (book.length > 0) {
                return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book[0].id} bookName={book[0].bookName} bookAuther={book[0].auther} bookPicture={book[0].bookCover}/>
            }
            return "";
        }));
    }    

    const handleReadBooks = () => {
        const booksRead = activeUser.booksRead.split(','); 
    
        setbooksToShow(booksRead.map((id) => {
            const book = books.filter(book => book.id == id);
            if (book.length > 0) {
                return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
            }
            return "";
        }));
    }
    

    const booksWantToRead = activeUser.booksWantToRead.split(','); 
    
    const booksWantToReadCards = booksWantToRead.map((id) => {
        const book = books.filter(book => book.id === id);
        if (book.length > 0) {
            return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
        }
        return "";
    });

    const booksWantToOwn = activeUser.booksWantToOwn.split(','); 
    
    const booksWantToOwnCards = booksWantToOwn.map((id) => {
        const book = books.filter(book => book.id === id);
        if (book.length > 0) {
            return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
        }
        return "";
    });

    const booksLoaned = activeUser.booksLoaned.split(','); 
    
    const booksLoanedCards = booksLoaned.map((id) => {
        const book = books.filter(book => book.id === id);
        if (book.length > 0) {
            return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
        }
        return "";
    });

    return(
       <Tab.Container defaultActiveKey="#link1">
            <Row>
                <Col sm={2}>
                    <ListGroup>
                        <ListGroup.Item action onClick={() => {handleBooks(activeUser.booksOwned)}} variant="danger">ספרים שברשותי</ListGroup.Item>
                        <ListGroup.Item action onClick={() => {handleBooks(activeUser.booksRead)}} variant="danger">ספרים שקראתי</ListGroup.Item>
                        <ListGroup.Item action onClick={() => {handleBooks(activeUser.booksWantToRead)}} variant="danger">ספרים שברצוני לקרוא</ListGroup.Item>
                        <ListGroup.Item action onClick={() => {handleBooks(activeUser.booksWantToOwn)}} variant="danger">ספרים שברצוני לרכוש</ListGroup.Item>
                        <ListGroup.Item action onClick={() => {handleBooks(activeUser.booksLoaned)}} variant="danger">ספרים שהשאלתי</ListGroup.Item>
                        {/* <ListGroup.Item action onClick={alertClicked}>
                        This one is a button
                        </ListGroup.Item> */}
                    </ListGroup>
                 </Col>
                <Col sm={10}>
                    <Row className="justify-content-even">
                        {booksToShow}
                    </Row>
                    {/* <Tab.Content>
                        <Tab.Pane eventKey="#booksOwnedLink">
                        {booksOwnedCards}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#booksReadLink">
                        {booksReadCards}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#booksWantToReadLink">
                        {booksWantToReadCards}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#booksWantToOwnLink">
                        {booksWantToOwnCards}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#booksLoanedLink">
                        {booksLoanedCards}
                        </Tab.Pane>
                    </Tab.Content> */}
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default BooksPage;