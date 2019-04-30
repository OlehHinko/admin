import React from 'react';
import { Form, Button } from 'react-bootstrap';
import is from 'is_js';
import { withRouter } from "react-router";

//style
import './Signin.scss';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitBtn: true,
            errors: {
                email: '',
                password: '',
            }
        };
    }

    handlerChangeField(e) {
        const { name, value } = e.target;
        if(!is.empty(value)){
            this.setState({
                submitBtn: false
            })
        } else {
            this.setState({
                submitBtn: true
            })
        }
        this.setState((prev) => {
            return {
                [ name ]: value,
                errors: {...prev.errors, [name]: ''}
            }
        });
    }

    onSignIn(e) {
        e.preventDefault();
        if (!this.isFormsValid()) {
            return
        }
        this.props.history.push('/');
        localStorage.setItem('isLogined', 'true');
    };

    isFormsValid() {
        const  errors = this.state.errors;
        let isValid = true;
        for (let key in errors) {
            if(key === 'email') {
                if(!this.isEmailValid(this.state[key])) isValid = false;
            }
            if(key === 'password') {
                if(!this.isPasswordValid(this.state[key])) isValid = false;
            }
        }
        return isValid;
    }

    isEmailValid(email) {
        let emailError = '';
        if (email === '') {
            emailError = 'You have not entered an email';
        }
        if (!is.email(email)) {
            emailError = 'You have entered an invalid email';
        }
        this.setState((prev) => {
            return {
                errors: {...prev.errors, email: emailError }
            }
        });
        return !emailError.length
    }

    isPasswordValid(password) {
        let passwordError = '';
        if (password === '') {
            passwordError = 'Password can not be empty';
        }
        if (password.length < 6) {
            passwordError = 'Password length must be more than six characters long';
        }
        this.setState((prev) => {
            return {
                errors: {...prev.errors, password: passwordError }
            }
        });
        return !passwordError.length
    }

    render() {
        const { email, password } = this.state.errors;
        const {submitBtn} = this.state;
        const classNames = require('classnames');
        return (
            <Form onSubmit={(e) => this.onSignIn(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className={classNames({'error' : email})}
                                  onChange={(e) => this.handlerChangeField(e)}
                                  value={this.state.email}
                                  placeholder="Enter email"
                                  name='email'/>
                    {email && <div className='error-massage'>{email}</div>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  className={classNames({'error' : password})}
                                  onChange={(e) => this.handlerChangeField(e)}
                                  value={this.state.password}
                                  placeholder="Password"
                                  name='password'/>
                    {password && <div className='error-massage'>{password}</div>}
                </Form.Group>
                <Button variant="primary"
                        className='btn-submit'
                        type="submit"
                        disabled={submitBtn}
                        >
                    Submit
                </Button>
            </Form>
        );
    }
}

export default withRouter(Signin);