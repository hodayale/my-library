import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EmailAndPassword from '../components/EmailAndPassword';

const LoginPage = (props) => {
    const {users, handleLogin, handleShowSignup, handleCloseLogin} = props;
    const [show, setShow] = React.useState(true);
    const [validated, setValidated] = React.useState(false);
    const [validateMsg, setvalidateMsg] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

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
                handleLogin(foundUser, rememberMe);
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

    const handleEmail = (e) => {
        setemail(e.target.value); 
        setvalidateMsg('');
    }

    const handlePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return(
        <Modal animation={false} show={show} backdrop="static" keyboard={false} centered>
            <Modal.Header className="justify-content-center">
                <Modal.Title className="logo-design text-danger">כניסה לספריה שלי</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <EmailAndPassword email={email} handleEmail={handleEmail} password={password} handlePassword={handlePassword} 
                                        rememberMe={rememberMe} handleRememberMe={handleRememberMe} />
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