import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React from 'react';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

const SignupPage = (props) => {
    const {users, handleLogin, handleCloseSignup, addUser} = props;
    const [show, setShow] = React.useState(true);
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
    const [fName, setfName] = React.useState('');
    const [lName, setlName] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [inputType, setInputType] = React.useState('password');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const valid = form.checkValidity();
        if (valid === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);

        if (valid === true){
            if(lName !== "" || fName !== "" || email !== "" || password !== "") {
                const foundUser = users.find((user) => {
                    return (user.email === email)
                });
                if(!foundUser) {
                    const newUser = {
                        id: users.length + 1,
                        fname: fName,
                        lname: lName,
                        email: email,
                        password: password
                    }
                    addUser(newUser);
                    handleLogin(newUser);
                    setShow(false);
                    handleCloseSignup(newUser);
                }
                else {
                    setvalidateMsg("משתמש כבר רשום במערכת!");
                }
            }
        }
    }

    const handlClose = () => {
        handleCloseSignup(null);
        setShow(false);
    }

    return(
        <Modal show={show} backdrop="static" keyboard={false} centered>
            <Modal.Header className="justify-content-center">
                <Modal.Title className="logo-design text-danger">הרשמה לספריה שלי</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="formName">
                                <Form.Label>שם פרטי</Form.Label>
                                <Form.Control className="input-rounded-corners" required type="text" onChange={(e) => {setfName(e.target.value)}} value={fName} />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group controlId="formBookAuther">
                                <Form.Label>שם משפחה</Form.Label>
                                <Form.Control className="input-rounded-corners" type="text" onChange={(e) => {setlName(e.target.value)}} value={lName} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>* כתובת דואר אלקטרוני</Form.Label>
                        <Form.Control className="input-rounded-corners text-right" required type="email" 
                                            onChange={(e) => {setemail(e.target.value);}} value={email}/>
                    </Form.Group>
                    <Form.Label>* סיסמה</Form.Label>
                    <Form.Group className="form-group" controlId="formBasicPassword">
                        <Form.Control className="input-rounded-corners" required type={inputType} 
                                            onChange={(e) => {setpassword(e.target.value);}} value={password}/>
                        {(inputType === 'password') ? <ImEye className="img-in-input hover-design" onClick={() => setInputType('text')}/> 
                                                    : <ImEyeBlocked className="img-in-input hover-design" onClick={() => setInputType('password')}/>}
                    </Form.Group>
                    <Form.Text className="text-danger">{validateMsg}</Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">  
                <Button className="button-rounded-corners bg-danger mt-4" type="button" block onClick={handleSubmit} variant="danger">הרשמה</Button>
                <Button className="button-rounded-corners mt-4" variant="secondary" onClick={handlClose}>סגור</Button>
            </Modal.Footer>   
        </Modal>
    );
}

export default SignupPage;