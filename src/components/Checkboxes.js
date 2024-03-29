import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect } from 'react';
import './Checkboxes.css'

const Checkboxes = (props) => {
    const {bookId, userId, bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, 
            bookLoanerName, showLoaned, addBookOwned, removeBookOwned, addBookRead, removeBookRead,
            addBookWantToRead, removeBookWantToRead, addBookWantToOwn, removeBookWantToOwn,
            addBookLoaned, removeBookLoaned, updateBookLoaned} = props;
    const [owned, setOwned] = React.useState(bookOwned);
    const [read, setRead] = React.useState(bookRead);
    const [wantToRead, setWantToRead] = React.useState(bookWantToRead);
    const [wantToOwn, setWantToOwn] = React.useState(bookWantToOwn);
    const [loaned, setLoaned] = React.useState(bookLoaned);
    const [loanerName, setLoanerName] = React.useState(bookLoanerName);

    useEffect(() => {
        setOwned(bookOwned);
        setRead(bookRead);
        setWantToRead(bookWantToRead);
        setWantToOwn(bookWantToOwn);
        setLoaned(bookLoaned);
        setLoanerName(bookLoanerName);
    }, [bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, bookLoanerName]);

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

        if(!loaned) {
            addBookLoaned(loanObj);
        } else {
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
        <Form>
                <Form.Check type='checkbox' checked={owned} onChange={handleChangedOwned} value={owned} label='ברשותי'/>
                <Form.Check type='checkbox' checked={read} onChange={handleChangedRead} value={read} label='קראתי'/>
                <Form.Check type='checkbox' checked={wantToRead} onChange={handleChangedWantToRead} 
                                value={wantToRead} disabled={read} label='ברצוני לקרוא'/>
                <Form.Check type='checkbox' checked={wantToOwn} onChange={handleChangedWantToOwn} 
                                value={wantToOwn} disabled={owned} label='ברצוני לרכוש'/>
                {showLoaned ? <Row>
                        <Col sm={5} md={5} lg={5}>
                            <Form.Check className="mt-1" type='checkbox' checked={loaned}
                                        onChange={handleChangedLoaned} 
                                        value={loaned} label='למי השאלתי'/>
                        </Col>
                        <Col sm={7} md={7} lg={7}>
                            <Form.Control value={loanerName} onChange={(e) => setLoanerName(e.target.value)} onBlur={handleChangedLoanedName} onKeyDown={handleEnter} disabled={loaned ? false : true}></Form.Control>
                        </Col>
                    </Row> : ""}
        </Form>
    );
}

export default Checkboxes;