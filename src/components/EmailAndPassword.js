import { Form } from "react-bootstrap";
import React from 'react';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

const EmailAndPassword = (props) => {
    const {email, handleEmail, password, handlePassword, rememberMe, handleRememberMe} = props;
    const [inputType, setInputType] = React.useState('password');
    
    return(
        <Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>* כתובת דואר אלקטרוני</Form.Label>
                <Form.Control className="input-rounded-corners text-right" required type="email" 
                            onChange={handleEmail} value={email}/>
            </Form.Group>
            <Form.Label>* סיסמה</Form.Label>
            <Form.Group className="form-group" controlId="formBasicPassword">
                <Form.Control className="input-rounded-corners" required type={inputType} 
                                    onChange={handlePassword} value={password}/>
                {(inputType === 'password') ? <ImEye className="img-in-input eye-img-in-input hover-design" onClick={() => setInputType('text')}/> 
                                            : <ImEyeBlocked className="img-in-input eye-img-in-input hover-design" onClick={() => setInputType('password')}/>}
                <Form.Check className="mt-2 mr-1" type='checkbox' checked={rememberMe} onChange={handleRememberMe} value={rememberMe} label='זכור אותי'/>
            </Form.Group>
        </Form.Group>
    )
}

export default EmailAndPassword;