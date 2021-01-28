import '../icons/love-book.svg';
import { Form, Nav, Navbar, InputGroup, NavDropdown } from "react-bootstrap";
//import { FcSearch } from 'react-icons/fc';
import React from 'react';
import './MyLibraryNavbar.css';
import { Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SinupPage';

const MyLibraryNavbar = (props) => {
    const {logo, activeUser, handleLogout, users, handleLogin, handleFilter, addUser} = props;
    const [redirectToBooks, setRedirectToBooks] = React.useState(false);
    const [redirectToAddBook, setRedirectToAddBook] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);
    const [showSignup, setShowSignup] = React.useState(false);
    
    const handleMyBooks = () => {
        if(activeUser) {
            setRedirectToBooks(true);
        }
        else{
            handleShowLogin();
        }
    }

    const handleShowLogin = () => {
        setShowLogin(true);
    }

    const handleShowSignup = () => {
        setShowSignup(true);
    }

    const handleCloseLogin = () => {
        setShowLogin(false);
    }

    const handleCloseSignup = (userObj) => {
        if(userObj){
            handleLogin(userObj);
        }
        setShowSignup(false);
    }

    const handlRedirectToBooks = () => {
        setRedirectToBooks(true);
    }

    const handleAddBook = () => {
        setRedirectToAddBook(true);
    }

    if(redirectToBooks) {
        return (<Redirect push to='/books'/>);
    }

    if(redirectToAddBook) {
        return (<Redirect push to='/addBook'/>);
    }

    const loginEl = (!activeUser) ? <Nav.Link onClick={handleShowLogin}>כניסה</Nav.Link> : null;
    const signupEl = (!activeUser) ? <Nav.Link onClick={handleShowSignup}>הרשמה</Nav.Link> : null;
    const logoutEl = (activeUser) ? <Nav.Link onClick={handleLogout}>יציאה</Nav.Link> : null;
    const userName = (activeUser) ? <Navbar.Text>שלום {activeUser.fname} {activeUser.lname}</Navbar.Text> : null;
    
    return (
        <Navbar bg="white" variant="light" expand="lg">
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
            
            {showLogin ? <LoginPage users={users} handleLogin={handleLogin} handlRedirectToBooks={handlRedirectToBooks} handleShowSignup={handleShowSignup} handleCloseLogin={handleCloseLogin}/> : ""}
            {showSignup ? <SignupPage users={users} handleLogin={handleLogin} handlRedirectToBooks={handlRedirectToBooks} handleCloseSignup={handleCloseSignup} addUser={addUser}/> : ""}
        </Navbar>
    );
}
export default MyLibraryNavbar;