import React from 'react';
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

const AddBookPage = (props) => {
    const {activeUser, books, addBook} = props;
    const [bookName, setbookName] = React.useState('');
    const [bookAuther, setbookAuther] = React.useState('');
    const [bookPublisher, setbookPublisher] = React.useState('');
    const [bookPublishDateMonth, setbookPublishDateMonth] = React.useState("בחר חודש...");
    const [bookPublishDateYear, setbookPublishDateYear] = React.useState("בחר שנה...");
    const [bookCategory, setbookCategory] = React.useState('');
    const [bookNumPages, setbookNumPages] = React.useState(0);
    const [bookSummery, setbookSummery] = React.useState('');
    const [bookCover, setbookCover] = React.useState('');
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
    const [show, setShow] = React.useState(false);

    const months = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"].map((month, index) => <option key={index}>{month}</option>);
    let years = [];
    for(let i=new Date().getFullYear(); i>1900 ; i--)
    {
        years.push(<option key={i}>{i}</option>)
    }

    const handleAddBook = (event) => {
       const form = event.currentTarget;
        const valid = form.checkValidity();
        if (valid === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
        console.log(valid);

        if (valid === true){
            const foundBook = books.find((book) => {
                return (book.bookName === bookName && book.auther === bookAuther)
            });
            if(bookName === "" || bookAuther === "" || bookPublisher === "" || bookCover === "" || bookSummery === "") {
                setvalidateMsg("אנא הכנס את כל הנתונים הדרושים");
            }
            else if(foundBook) {
                setvalidateMsg("הספר כבר קיים במערכת")
            } else {
                if(bookPublishDateMonth === "בחר חודש..."){
                    setbookPublishDateMonth("");
                }
                if(bookPublishDateYear === "בחר שנה..."){
                    setbookPublishDateYear("");
                }
                const newBook = {
                    id: books.length + 1,
                    bookName: bookName,
                    auther: bookAuther,
                    publisher: bookPublisher,
                    publishDate: bookPublishDateMonth + ' ' + bookPublishDateYear,
                    category: bookCategory,
                    numPages: bookNumPages,
                    bookCover: bookCover,
                    summery: bookSummery
                }
                addBook(newBook);
                //showing the modal window of success
                setShow(true);
                //clearing the data
                setbookName('');
                setbookAuther('');
                setbookPublisher('');
                setbookPublishDateMonth("בחר חודש...");
                setbookPublishDateYear("בחר שנה...");
                setbookCategory('');
                setbookNumPages(0);
                setbookSummery('');
                setbookCover('');
                setValidated(false);
            }
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleAddBook();
        }
    }

    const handleModalEnter = (e) => {
        if (e.key === 'Enter') {
            setShow(false);
        }
    }

    if(!activeUser) {
        return <Redirect push to='/'/>;
    }
                    
    return(
        <Container>
            <h1 className="text-center name-of-book-design">הוסף ספר חדש</h1>
            <Form noValidate validated={validated}>
                <Row className="mt-4">
                    <Col sm={8}>
                        <Row>
                            <Col sm={6}>
                                <Form.Group controlId="formBookName">
                                    <Form.Label>שם הספר</Form.Label>
                                    <Form.Control className="input-rounded-corners" required type="text" onChange={(e) => {setbookName(e.target.value)}} value={bookName} />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="formBookAuther">
                                    <Form.Label>שם המחבר</Form.Label>
                                    <Form.Control className="input-rounded-corners" type="text" onChange={(e) => {setbookAuther(e.target.value)}} value={bookAuther} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                            <Form.Group controlId="formBookPublisher">
                                <Form.Label>שם ההוצאה</Form.Label>
                                <Form.Control className="input-rounded-corners" type="text" onChange={(e) => {setbookPublisher(e.target.value)}} value={bookPublisher} required/>
                            </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group controlId="formBookPublisherDate">
                                            <Form.Label>תאריך ההוצאה</Form.Label>                                    
                                            <Form.Control className="input-rounded-corners" as="select" onChange={(e) => {setbookPublishDateMonth(e.target.value)}} value={bookPublishDateMonth}>
                                                <option>בחר חודש...</option>
                                                {months}
                                            </Form.Control> 
                                        </Form.Group>
                                    </Col> 
                                    <Col sm={6}>
                                        <Form.Group>                           
                                            <Form.Label >   </Form.Label>
                                            <Form.Control className="input-rounded-corners mt-2" as="select" onChange={(e) => {setbookPublishDateYear(e.target.value)}} value={bookPublishDateYear}>
                                                <option>בחר שנה...</option>
                                                {years}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                            <Form.Group controlId="formBookCategory">
                                <Form.Label>קטגוריה</Form.Label>
                                <Form.Control className="input-rounded-corners" type="text" onChange={(e) => {setbookCategory(e.target.value)}} value={bookCategory}/>
                            </Form.Group>
                            </Col>
                            <Col sm={6}>
                            <Form.Group controlId="formBookNumPages">
                                <Form.Label>מספר עמודים</Form.Label>
                                <Form.Control className="input-rounded-corners" type="number" onChange={(e) => {setbookNumPages(e.target.value)}} value={bookNumPages}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formBookCategory">
                                <Form.Label>תמונה</Form.Label>
                                <Form.Control className="input-rounded-corners" type="text" onChange={(e) => {setbookCover(e.target.value)}} value={bookCover} 
                                              placeholder="אנא הכנס לינק לתמונה" required/>
                        </Form.Group>
                        <Form.Group controlId="formBookSummery">
                            <Form.Label>תקציר</Form.Label>
                            <Form.Control className="input-rounded-corners" as="textarea" rows={5} onChange={(e) => {setbookSummery(e.target.value)}} value={bookSummery} required/>
                        </Form.Group>  
                        <Form.Text className="text-danger">{validateMsg}</Form.Text>
                    </Col>
                    <Col sm={4}>
                        <div className={bookCover === "" ? "image-border" : ""}>
                            <Image className="image" style={{ width: '18rem'}} src={bookCover}/>
                        </div>
                    </Col>
                </Row>
                <Form.Group className="justify-content-center">
                    <Button type="button" className="mt-4 button-rounded-corners bg-danger" variant="danger" onClick={handleAddBook} onKeyDown={handleEnter}>הוסף ספר</Button>
                </Form.Group>
            </Form>

            <Modal show={show} backdrop="static" keyboard={false} centered>
                <Modal.Footer className="justify-content-center">
                    <p className="text-center">הספר נוסף בהצלחה!</p>
                    <Button className="mt-4 button-rounded-corners bg-danger" variant="danger" onClick={()=>{setShow(false)}} onKeyDown={handleModalEnter}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AddBookPage;