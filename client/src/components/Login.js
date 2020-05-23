import React, { useRef, useState } from 'react';
import API from '../utils/API';
import { Redirect } from "react-router-dom";
import "../Style/LogInSignUp.css";

function Login() {
    const [loggedIn, setloggedIn] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.checkUser({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then(result =>{
            console.log(result.data.email);
            localStorage.setItem("email",result.data.email);
            setloggedIn(true);
        });
    }

    return (
        <div className="bgCover">
            {!loggedIn &&
                <div className="container p-5 loginDiv">
                    <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center" >
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
                                className="btn btn-primary btn-block"
                                onClick={handleSubmit}>
                                Login
                            </button>
                        </form>
                        <hr />
                        <h6>
                            Not a uPic member? <a href="/signup">Sign up here</a>
                        </h6>
                    </div>
                </div>}
            {loggedIn && (<Redirect to={{
                pathname: '/profile',
                state: { email: `${loggedIn.user}` }
            }}
            />)}
        </div>
    )
};

export default Login;