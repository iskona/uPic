import React, { useState, useRef } from 'react';
import API from '../utils/API';
import { Redirect } from "react-router-dom";
import "../Style/LogInSignUp.css";
import Title from './Title';
import Img from '../Style/Img/6.jpg';

function SignUp() {
    const [loggedIn, setloggedIn] = useState({
        signedin: false,
        user: ""
    });

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();
    const bgStyle = {
        backgroundImage: "url(" + Img + ")"
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        API.saveUser({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value
        })
            .then(result => {
                console.log(result.data)
                localStorage.setItem("email", result.data.email);
                setloggedIn({
                    signedin: true,
                    user: result.data.email
                });
            });
    }

    return (
        <div className="bgCover" style={bgStyle}>

            {!loggedIn.signedin ?
                (<div className="container p-5 signUpDiv">
                    <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">
                        <Title title="Sign up for uPic" displaySize="5" />
                        <form className="p-5 mx-auto">
                            <div className="form-group">
                                <input type="text"
                                    className="form-control mb-1"
                                    placeholder="User Name"
                                    ref={nameRef} />
                                <input type="email"
                                    className="form-control mb-1"
                                    placeholder="Email"
                                    ref={emailRef} />
                                <input type="password"
                                    className="form-control mb-1"
                                    placeholder="Password"
                                    ref={passwordRef} />
                                <input type="password"
                                    className="form-control mb-1"
                                    placeholder="Confirm Password"
                                    ref={password2Ref} />
                            </div>

                            <button type="submit"
                                className="btn btn-secondary btn-block"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                        </form>
                        <hr />
                        <h6>
                            Already a uPic member? <a href="/login">Log in here</a>
                        </h6>
                    </div>

                </div>) : (<Redirect to={{
                    pathname: '/profile',
                    state: { email: `${loggedIn.user}` }
                }}
                />)
            }
        </div>
    )
};

export default SignUp;
