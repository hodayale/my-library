import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React from 'react';

const BookDetailsPage = (props) => {
    const {activeUser, books} = props;
    const {bookId} = useParams();

    //get book details by ID
    const selectedBook = books.find((item) => {return item.id == bookId});
    

    return(
        <Container>
            
            <Row className="mt-4">
            <Col sm={4}>
                    <Image  style={{ width: '18rem'}} src={selectedBook.bookCover} rounded/>
                </Col>
                <Col sm={8}>
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