import React, { useRef, useState } from 'react';
import API from '../utils/API';
import { Redirect } from "react-router-dom";
import Title from './Title';
import Img from '../Style/Img/7.jpg';
import "../Style/LogInSignUp.css";
import ShowError from "./ShowError";

function Login() {
    const [loggedIn, setloggedIn] = useState(false);
    const [error,setError] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();
    const bgStyle = {
        backgroundImage: "url(" + Img + ")"
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        API.checkUser({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
            .then(result => {
                console.log(result.data.email);
                localStorage.setItem("email", result.data.email);
                setloggedIn(true);
            })
            .catch(err=> {
                console.log(err.response);
                if(err.response.data){
                    console.log(err.response.data)
                    setError("Please Provide Valid Credentials !!")
                }
            })
    }

    return (
        <div className="bgCover" style={bgStyle}>
            {!loggedIn &&
                <div className="container p-5 loginDiv">
                    <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center" >
                        <Title title="Log in to uPic" displaySize="5" />
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
                                className="btn btn-secondary btn-block"
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
                        {error && <ShowError message={error} page="login"/>}

        </div>
    )
};

export default Login;