import { Col, Form, Row } from "react-bootstrap";
import React from 'react';

const Checkboxes = (props) => {
    const {bookOwned, bookRead, bookWantToRead, bookWantToOwn, bookLoaned, bookLoanerName, showLoaned} = props;
    const [owned, setOwned] = React.useState(bookOwned);
    const [read, setRead] = React.useState(bookRead);
    const [wantToRead, setWantToRead] = React.useState(bookWantToRead);
    const [wantToOwn, setWantToOwn] = React.useState(bookWantToOwn);
    const [loaned, setLoaned] = React.useState(bookLoaned);
    const [loanerName, setLoanerName] = React.useState(bookLoanerName);
    
    return(
        <Form className="mt-4">
                <Form.Check type='checkbox' id='books-owned' checked={owned} 
                                onChange={() => {setOwned(!owned); setWantToOwn((!owned) ? false : wantToOwn);}}                                                              
                                value={owned} label='ברשותי'/>
                <Form.Check type='checkbox' id='books-read' checked={read} 
                                onChange={() => {setRead(!read); setWantToRead((!read) ? false : wantToRead)}} 
                                value={read} label='קראתי'/>
                <Form.Check type='checkbox' id='books-want-to-read' checked={wantToRead} 
                                onChange={() => setWantToRead(!wantToRead)} 
                                value={wantToRead} disabled={read} label='ברצוני לקרוא'/>
                <Form.Check type='checkbox' id='books-want-to-own' checked={wantToOwn} 
                                onChange={() => setWantToOwn(!wantToOwn)} 
                                value={wantToOwn} disabled={owned} label='ברצוני לרכוש'/>
                {showLoaned ? <Row>
                        <Col sm={5}>
                        <Form.Check type='checkbox' id='books-loaned' checked={loaned}
                                        onChange={() => {setLoaned(!loaned); setLoanerName('');}} 
                                        value={loaned} label='השאלתי ל'/>
                        </Col>
                        <Col sm={7}>
                        <Form.Control value={loanerName} onChange={(e) => setLoanerName(e.target.value)} disabled={loaned ? false : true}></Form.Control>
                        </Col>
                    </Row> : ""}
        </Form>
    );
}

export default Checkboxes;