import '../icons/love-book.svg';
import { Form, FormControl, Nav, Navbar, InputGroup, Modal, Button, NavDropdown } from "react-bootstrap";
import { FcSearch } from 'react-icons/fc';
import React from 'react';
import './MyLibraryNavbar.css';
import { Redirect } from 'react-router-dom';

const MyLibraryNavbar = (props) => {
    const {logo, activeUser, handleLogout, users, handleLogin, handleFilter} = props;
    const [show, setShow] = React.useState(false);
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [redirectToBooks, setRedirectToBooks] = React.useState(false);
    const [redirectToAddBook, setRedirectToAddBook] = React.useState(false);
    
    const handleMyBooks = () => {
        if(activeUser) {
            setRedirectToBooks(true);
        }
        else{
            handleShow();
        }
    }

    const handleAddBook = () => {
        setRedirectToAddBook(true);
    }

    //const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const valid = form.checkValidity();
        if (valid === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);

        if (valid === true){
            const foundUser = users.find((user) => {
                return (user.email === email && user.password === password)
            });
            if(foundUser) {
                handleLogin(foundUser);
                setShow(false);
                setRedirectToBooks(true);
            }
            else {
                setemail('');
                setpassword('');
                setvalidateMsg("משתמש לא נמצא!");
            }
        }
    };

    if(redirectToBooks) {
        return (<Redirect push to='/books'/>);
    }

    if(redirectToAddBook) {
        return (<Redirect push to='/addBook'/>);
    }

    const loginEl = (!activeUser) ? <Nav.Link onClick={handleShow}>כניסה</Nav.Link> : null;
    const signupEl = (!activeUser) ? <Nav.Link href="#/signup">הרשמה</Nav.Link> : null;
    const logoutEl = (activeUser) ? <Nav.Link onClick={handleLogout}>יציאה</Nav.Link> : null;
    const userName = (activeUser) ? <Navbar.Text>שלום {activeUser.fname} {activeUser.lname}</Navbar.Text> : null;
    
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand className="logo-design text-danger brand-design" href="#/">
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>   
                {' '}
                הספריה שלי 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
                <Nav> 
                    <NavDropdown title="הספרים" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleMyBooks}>הספרים שלי</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleAddBook}>הוסף ספר</NavDropdown.Item>
                    </NavDropdown>
                    <Form>
                        <InputGroup>
                            <Form.Control className="search-book-design" type="text" placeholder="חפש ספר" onChange={handleFilter}/>
                            {/* <InputGroup.Text>
                                    <FcSearch />
                            </InputGroup.Text> */}
                        </InputGroup>
                    </Form>
                </Nav>
                
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end login-design">
                {loginEl}
                {logoutEl}
                {signupEl}
                {userName}
            </Navbar.Collapse>
            

            <Modal show={show} backdrop="static" keyboard={false} centered>
                <Modal.Header className="justify-content-center">
                    <Modal.Title className="logo-design text-danger">כניסה לספריה שלי</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* כתובת דואר אלקטרוני</Form.Label>
                            <FormControl className="input-rounded-corners text-right" required type="email" placeholder="כתובת דואר אלקטרוני"
                                        onChange={(e) => {setemail(e.target.value); setvalidateMsg('');}} value={email}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>* סיסמה</Form.Label>
                            <FormControl className="input-rounded-corners" required type="password" placeholder="סיסמה"
                                        onChange={(e) => {setpassword(e.target.value); setvalidateMsg('');}} value={password}/>
                        </Form.Group>
                        <Form.Text className="text-danger">{validateMsg}</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="button-rounded-corners bg-danger" type="button" block onClick={handleSubmit} variant="danger">כניסה</Button>
                    <Form.Text className="text-muted">
                    לא רשום עדיין? 
                    <span><a href="#/signup"> לחץ כאן </a></span>
                    </Form.Text>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}
export default MyLibraryNavbar;