import React, { useRef } from 'react'
import API from '../utils/API';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.ckeckUser({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        <div className="container p-5">
            <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">
                <h2>
                    Log in to uPic
                </h2>
                <form className="p-5 mx-auto">
                    <div className="form-group">
                        <input type="email"
                            className="form-control mb-1"
                            placeholder="Email address"
                            ref={emailRef} />
                        <input type="password"
                            className="form-control mb-1"
                            placeholder="Password"
                            ref={passwordRef} />
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