import { Col, Form, Row } from "react-bootstrap";
import React from 'react';

const Checkboxes = (props) => {
    const {bookId, userId, bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, 
            bookLoanerName, showLoaned, addBookOwned, removeBookOwned, addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead, addBookWantToOwn, removeBookWantToOwn,
            removeBookLoaned, updateBookLoaned} = props;
    const [owned, setOwned] = React.useState(bookOwned);
    const [read, setRead] = React.useState(bookRead);
    const [wantToRead, setWantToRead] = React.useState(bookWantToRead);
    const [wantToOwn, setWantToOwn] = React.useState(bookWantToOwn);
    const [loaned, setLoaned] = React.useState(bookLoaned);
    const [loanerName, setLoanerName] = React.useState(bookLoanerName);

    const handleChangedOwned = () => {
        setOwned(!owned); 
        setWantToOwn((!owned) ? false : wantToOwn);

        const ownObj = {
            userId: userId,
            bookId: parseInt(bookId)
        }

        if(!owned) {  
            addBookOwned(ownObj);
            removeBookWantToOwn(ownObj)
        } else {
            removeBookOwned(ownObj);
        }
    }

    const handleChangedRead = () => {
        setRead(!read); 
        setWantToRead((!read) ? false : wantToRead)

        const readObj = {
            userId: userId,
            bookId: parseInt(bookId)
        }

        if(!read) {  
            addBookRead(readObj);
            removeBookWantToRead(readObj);
        } else {
            removeBookRead(readObj);
        }
    }

    const handleChangedWantToRead = () => {
        setWantToRead(!wantToRead);

        const readObj = {
            userId: userId,
            bookId: parseInt(bookId)
        }

        if(!wantToRead) {  
            addBookWantToRead(readObj);
        } else {
            removeBookWantToRead(readObj);
        }
    }

    const handleChangedWantToOwn = () => {
        setWantToOwn(!wantToOwn)

        const ownObj = {
            userId: userId,
            bookId: parseInt(bookId)
        }

        if(!wantToOwn) {  
            addBookWantToOwn(ownObj);
        } else {
            removeBookWantToOwn(ownObj);
        }
    }

    const handleChangedLoaned = () => {
        setLoaned(!loaned); 
        setLoanerName('');

        const loanObj = {
            userId: userId,
            bookId: parseInt(bookId)
        }

        if(loaned) {
            removeBookLoaned(loanObj);
        }
    }

    const handleChangedLoanedName = () => {
        const loanObj = {
            userId: userId,
            bookId: parseInt(bookId),
            nameOfLoaner: loanerName
        }

        updateBookLoaned(loanObj);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleChangedLoanedName();
            document.activeElement.blur();
        }
    }
    
    return(
        <Form className="mt-4">
                <Form.Check type='checkbox' id='books-owned' checked={owned} onChange={handleChangedOwned} value={owned} label='ברשותי'/>
                <Form.Check type='checkbox' id='books-read' checked={read} onChange={handleChangedRead} value={read} label='קראתי'/>
                <Form.Check type='checkbox' id='books-want-to-read' checked={wantToRead} onChange={handleChangedWantToRead} 
                                value={wantToRead} disabled={read} label='ברצוני לקרוא'/>
                <Form.Check type='checkbox' id='books-want-to-own' checked={wantToOwn} onChange={handleChangedWantToOwn} 
                                value={wantToOwn} disabled={owned} label='ברצוני לרכוש'/>
                {showLoaned ? <Row>
                        <Col sm={5}>
                        <Form.Check type='checkbox' id='books-loaned' checked={loaned}
                                        onChange={handleChangedLoaned} 
                                        value={loaned} label='השאלתי ל'/>
                        </Col>
                        <Col sm={7}>
                        <Form.Control value={loanerName} onChange={(e) => setLoanerName(e.target.value)} onBlur={handleChangedLoanedName} onKeyDown={handleEnter} disabled={loaned ? false : true}></Form.Control>
                        </Col>
                    </Row> : ""}
        </Form>
    );
}

export default Checkboxes;