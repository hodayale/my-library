import '../icons/love-book.svg';
import { Form, FormControl, Nav, Navbar, Button } from "react-bootstrap";
//import { IoIosBook } from 'react-icons/io';

const MyLibraryNavbar = (props) => {
    const {logo} = props;
    // handleLogin = () => {}
    
    return (
        <Navbar bg="light" expand="lg">
            <Nav>  
                <Nav.Link /*onClick={handleLogin}*/>כניסה</Nav.Link>
                <Nav.Link href="#/signup">הרשמה</Nav.Link>
                {/* <Nav.Link onClick={handleLogout}>יציאה</Nav.Link> */}
            </Nav>
            <Form inline>
                <Button variant="outline-success">חפש</Button>
                <FormControl type="text" placeholder="חיפוש ספר" className="ml-sm-2 text-right" />
            </Form>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">  
                    <Nav.Link href="#/books">הספרים</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
            <Navbar.Brand className="logo-design" href="#/">
                הספריה שלי 
                {' '}
                {/* <IoIosBook />  */}
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />                
                </Navbar.Brand>
        </Navbar>
    );
}
export default MyLibraryNavbar;