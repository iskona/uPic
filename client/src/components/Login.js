import React, { useRef } from 'react'
import API from '../utils/API';
import FormInput from './FormInput';
import Title from './Title';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.checkUser({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <div className="container p-5">
            <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">
            <Title title="Login for uPic !!" displaySize="5"/>
                <form className="p-5 mx-auto">
                    <div className="form-group">
                        <FormInput inputType="email" place_holder="Email address" inputRef={emailRef} />
                        <FormInput inputType="password" place_holder="Password" inputRef={passwordRef} />
                    </div>
                    <button type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}>
                        Login
                    </button>
                    <hr />
                    <h6>
                        Not a uPic member? <a href="/signup">Sign up here</a>
                    </h6>
                </form>
            </div>
        </div>
    )
}

export default Login;