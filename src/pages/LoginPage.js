import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

const LoginPage = (props) => {
    const {users, handleLogin, handleShowSignup, handleCloseLogin} = props;
    const [show, setShow] = React.useState(true);
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
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
            const foundUser = users.find((user) => {
                return (user.email === email && user.password === password)
            });
            if(foundUser) {
                handleLogin(foundUser);
                setShow(false);
                handleCloseLogin();
            }
            else {
                setemail('');
                setpassword('');
                setvalidateMsg("משתמש לא נמצא!");
            }
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return(
        <Modal animation={false} show={show} backdrop="static" keyboard={false} centered>
            <Modal.Header className="justify-content-center">
                <Modal.Title className="logo-design text-danger">כניסה לספריה שלי</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>* כתובת דואר אלקטרוני</Form.Label>
                        <Form.Control className="input-rounded-corners text-right" required type="email" 
                                    onChange={(e) => {setemail(e.target.value); setvalidateMsg('');}} value={email}/>
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
                <Button className="button-rounded-corners bg-danger" type="button" block onClick={handleSubmit} onKeyPress={handleEnter} variant="danger">כניסה</Button>
                <Form.Text className="text-muted">
                לא רשום עדיין? 
                <span className="link-design" onClick={() => {setShow(false); handleCloseLogin(); handleShowSignup();}}> לחץ כאן </span>
                </Form.Text>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginPage;