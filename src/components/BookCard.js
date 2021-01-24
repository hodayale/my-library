import { Card } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";

const BookCard = (props) => {
    const {filter, bookId, bookName, bookAuther, bookPicture} = props;
    //const [BookPicture, setBookPicture] = React.useState(undefined);
    const [redirect, setRedirect] = React.useState(false);

    const navigateToBook = () => {
        setRedirect(true);
    }

    if(redirect) {
        return (<Redirect push to={`/books/${bookId}`}/>)
    }

    return(
        // <Card style={{ width: '18rem', display: bookName.toLowerCase().includes(filter.toLowerCase()) ? "" : "none"}} onDoubleClick={navigateToBook}> 
        <Card className="card-design bg-light" style={{ width: '18rem', marginBottom: '20px', display: bookName.includes(filter) ? "" : "none"}} onDoubleClick={navigateToBook}>  
            <Card.Body className="text-center">
                <Card.Img variant="top" src={bookPicture} />
                <Card.Title>{bookName}</Card.Title>
                <Card.Text>{bookAuther}</Card.Text>
                <Form>
                <Form.Check type='checkbox' id='books-owned' label='ספרים שברשותי'/>
                <Form.Check type='checkbox' id='books-read' label='ספרים שברשותי'/>
                <Form.Check type='checkbox' id='books-want-to-read' label='ספרים שברשותי'/>
                <Form.Check type='checkbox' id='books-want-to-own' label='ספרים שברשותי'/>
                <Form.Check type='checkbox' id='books-loaned' label='ספרים שברשותי'/>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default BookCard;