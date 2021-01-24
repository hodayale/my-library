import { Col, ListGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import React from 'react';
import BookCard from "../components/BookCard";
//import { useEffect } from 'react';

const BooksPage = (props) => {
    const {activeUser, books, filter} = props;
    const [booksToShow, setbooksToShow] = React.useState('');
    const [active, setactive] = React.useState('owned');
    
    // useEffect(() => {
    //     handleBooks(activeUser.booksOwned);
    // }, [booksToShow]);

    if(!activeUser) {
        return <Redirect push to="/"/>;
    }

    const handleBooks = (booksIds, activeStr) => {
        const booksIdArr = booksIds.split(','); 
        
        setbooksToShow(booksIdArr.map((id) => {
            const book = books.filter(book => book.id == id);
            if (book.length > 0) {
                return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book[0].id} bookName={book[0].bookName} bookAuther={book[0].auther} bookPicture={book[0].bookCover} active={activeStr}/>
            }
            return "";
        }));
    } 

    return(
        <Row>
            <Col sm={2}>
                <ListGroup>
                    <ListGroup.Item className={active == 'owned' ? "active" : ""}
                                    action onClick={() => {setactive('owned'); handleBooks(activeUser.booksOwned, 'owned');}} variant="danger">ספרים שברשותי</ListGroup.Item>
                    <ListGroup.Item className={active == 'read' ? "active" : ""}
                                    action onClick={() => {setactive('read'); handleBooks(activeUser.booksRead, 'read')}} variant="danger">ספרים שקראתי</ListGroup.Item>
                    <ListGroup.Item className={active == 'wantToRead' ? "active" : ""}
                                    action onClick={() => {setactive('wantToRead'); handleBooks(activeUser.booksWantToRead,'wantToRead')}} variant="danger">ספרים שברצוני לקרוא</ListGroup.Item>
                    <ListGroup.Item className={active == 'wantToOwned' ? "active" : ""}
                                    action onClick={() => {setactive('wantToOwned'); handleBooks(activeUser.booksWantToOwn,'wantToOwned')}} variant="danger">ספרים שברצוני לרכוש</ListGroup.Item>
                    <ListGroup.Item className={active == 'loaned' ? "active" : ""}
                                    action onClick={() => {setactive('loaned'); handleBooks(activeUser.booksLoaned)}} variant="danger">ספרים שהשאלתי</ListGroup.Item>
                </ListGroup>
                </Col>
            <Col sm={10}>
                <Row className="justify-content-even">
                    {booksToShow}
                </Row>
            </Col>
        </Row>
    );
}

export default BooksPage;