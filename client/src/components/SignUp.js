import React, { useState, useRef } from 'react'
import API from '../utils/API';
import ShowError from "./ShowError"
import FormInput from './FormInput';

function SignUp() {
    const [showError, setShowError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.saveUser({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value
        })
            .then(res => {
                console.log(res);
                if (res) {
                    console.log("Show Profile page");
                }
            })
            .catch(err => {
                console.log(err.message);
                setShowError(true);
            })
    }
    return (
        <div>
                <div className="container p-5">
                    <header>
                        <h2>
                            Sign up for uPic
                </h2>
                    </header>
                    <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">

                        <form className="p-5 mx-auto">
                            <div className="form-group">
                                <FormInput inputType="text" place_holder="User Name" inputRef={nameRef} />
                                <FormInput inputType="email" place_holder="Email" inputRef={emailRef} />
                                <FormInput inputType="password" place_holder="Password" inputRef={passwordRef} />
                                <FormInput inputType="password" place_holder="Confirm Password" inputRef={password2Ref} />
                            </div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                        </form>
                    </div>

                </div>
            {showError && <ShowError />}
        </div>
    )
}
export default SignUp
