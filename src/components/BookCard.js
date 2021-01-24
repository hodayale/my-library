import { Card, Form } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";

const BookCard = (props) => {
    const {activeUser, filter, bookId, bookName, bookAuther, bookPicture} = props;
    //const [BookPicture, setBookPicture] = React.useState(undefined);
    const [redirect, setRedirect] = React.useState(false);
    const [bookOwned, setbookOwned] = React.useState(false);
    const [bookRead, setbookRead] = React.useState(false);
    const [bookWantToRead, setbookWantToRead] = React.useState(false);
    const [bookWantToOwn, setbookWantToOwn] = React.useState(false);
    const [bookLoaned, setbookLoaned] = React.useState('');

    const navigateToBook = () => {
        setRedirect(true);
    }

    if(redirect) {
        return (<Redirect push to={`/books/${bookId}`}/>)
    }

    if(activeUser) {
        const booksOwned = activeUser.booksOwned.split(',');
        const booksRead = activeUser.booksRead.split(',');
        const booksWantToRead = activeUser.booksWantToRead.split(',');
        const booksWantToOwn = activeUser.booksWantToOwn.split(',');

        if(booksOwned.includes(bookId)) {
            setbookOwned(true);
        }

        if(booksRead.includes(bookId)) {
            setbookRead(true);
        }

        if(booksWantToRead.includes(bookId)) {
            setbookWantToRead(true);
        }

        if(booksWantToOwn.includes(bookId)) {
            setbookWantToOwn(true);
        }        
    }

    const checkboxs =  <Form>
            <Form.Check type='checkbox' id='books-owned' checked={bookOwned} label='ספרים שברשותי'/>
            <Form.Check type='checkbox' id='books-read' checked={bookRead} label='ספרים שקראתי'/>
            <Form.Check type='checkbox' id='books-want-to-read' checked={bookWantToRead} label='ספרים שברצוני לקרוא'/>
            <Form.Check type='checkbox' id='books-want-to-own' checked={bookWantToOwn} label='ספרים שברצוני לרכוש'/>
            {/* <Form.Check type='checkbox' id='books-loaned' checked={bookLoaned} label='ספרים שהשאלתי'/> */}
        </Form>;

    

    return(
        // <Card style={{ width: '18rem', display: bookName.toLowerCase().includes(filter.toLowerCase()) ? "" : "none"}} onDoubleClick={navigateToBook}> 
        <Card className="card-design bg-light" style={{ width: '18rem', marginBottom: '20px', display: bookName.includes(filter) ? "" : "none"}} onDoubleClick={navigateToBook}>  
            <Card.Body>
                <Card.Img variant="top" src={bookPicture} />
                <Card.Title className="text-center">{bookName}</Card.Title>
                <Card.Text className="text-center">{bookAuther}</Card.Text>
                {activeUser ? checkboxs : ''}
            </Card.Body>
        </Card>
    );
}

export default BookCard;