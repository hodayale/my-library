import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React from 'react';

const SignupPage = () => {
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
    const [fName, setfName] = React.useState('');
    const [lName, setlName] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');

    const handleSubmit = () => {

    }

    return(
        <Container>
            <h1 className="text-center name-of-book-design">הרשמה</h1>
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
                    <Form.Control className="input-rounded-corners text-right" required type="email" placeholder="כתובת דואר אלקטרוני"
                                        onChange={(e) => {setemail(e.target.value);}} value={email}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>* סיסמה</Form.Label>
                    <Form.Control className="input-rounded-corners" required type="password" placeholder="סיסמה"
                                        onChange={(e) => {setpassword(e.target.value);}} value={password}/>
                </Form.Group>
                <Form.Text className="text-danger">{validateMsg}</Form.Text>
                <Button className="button-rounded-corners bg-danger mt-4" type="button" block onClick={handleSubmit} variant="danger">הרשמה</Button>
            </Form>
        </Container>
    );
}

export default SignupPage;