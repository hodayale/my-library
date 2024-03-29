import '../icons/love-book.svg';
import { Nav, Navbar } from "react-bootstrap";
import React from 'react';
import './MyLibraryNavbar.css';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SinupPage';
import LiveSearchBox from './LiveSearchBox';

const MyLibraryNavbar = (props) => {
    const {logo, activeUser, handleLogout, users, handleLogin, addUser, results, searchBook, showSearchResults} = props;
    const [showLogin, setShowLogin] = React.useState(false);
    const [showSignup, setShowSignup] = React.useState(false);
    
    const handleMyBooks = () => {
        if(!activeUser){
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

    const loginEl = (!activeUser) ? <Nav.Link onClick={handleShowLogin}>כניסה</Nav.Link> : null;
    const signupEl = (!activeUser) ? <Nav.Link onClick={handleShowSignup}>הרשמה</Nav.Link> : null;
    const logoutEl = (activeUser) ? <Nav.Link onClick={handleLogout}>יציאה</Nav.Link> : null;
    const userName = (activeUser) ? <Navbar.Text>שלום {activeUser.fname} {activeUser.lname}</Navbar.Text> : null;
    
    return (
        <Navbar bg="white" variant="light" expand="lg">
            <Navbar.Brand className="logo-design text-danger brand-design" href="#/">
                <img alt="" src={logo} width="30" height="30" className="d-inline-block"/>   
                {' '}
                ספר של בית 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
                <Nav> 
                    {/* <NavDropdown title="הספרים" id="basic-nav-dropdown"> */}
                        <Nav.Link className="nav-drop-down" href="#/books" onClick={handleMyBooks}>הספרים שלי</Nav.Link>
                        <Nav.Link className="nav-drop-down" href="#/addBook" onClick={handleMyBooks}>הוסף ספר</Nav.Link>
                    {/* </NavDropdown> */}
                    {/* <Form> */}
                        {/* <InputGroup> */}
                            <LiveSearchBox placeholderText="חפש ספר" results={results}
                                            searchTextChanged={searchBook} resultSelected={showSearchResults}/>
                        {/* </InputGroup> */}
                    {/* </Form> */}
                </Nav>
                
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end login-design">
                {loginEl}
                {logoutEl}
                {signupEl}
                {userName}
            </Navbar.Collapse>
            
            {showLogin ? <LoginPage users={users} handleLogin={handleLogin} handleShowSignup={handleShowSignup} handleCloseLogin={handleCloseLogin}/> : ""}
            {showSignup ? <SignupPage users={users} handleLogin={handleLogin} handleCloseSignup={handleCloseSignup} addUser={addUser}/> : ""}
        </Navbar>
    );
}
export default MyLibraryNavbar;