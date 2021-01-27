import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React from 'react';
import Checkboxes from "../components/Checkboxes";

const BookDetailsPage = (props) => {
    const {activeUser, books, bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, bookLoanerName} = props;
    const {bookId} = useParams();
    // const [owned, setOwned] = React.useState(bookOwned);
    // const [read, setRead] = React.useState(bookRead);
    // const [wantToRead, setWantToRead] = React.useState(bookWantToRead);
    // const [wantToOwn, setWantToOwn] = React.useState(bookWantToOwn);
    // const [loaned, setLoaned] = React.useState(bookLoaned);
    // const [loanerName, setLoanerName] = React.useState(bookLoanerName);

    //get book details by ID
    const selectedBook = books.find((item) => {return item.id == bookId});

    const checkboxs = <Checkboxes bookOwned={bookOwned} bookRead={bookRead} bookWantToRead={bookWantToRead} 
                                  bookWantToOwn={bookWantToOwn} bookLoaned={bookLoaned} bookLoanerName={bookLoanerName} showLoaned={true}/> ;
    

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