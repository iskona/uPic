import React,{useRef} from 'react'
import API from '../utils/API';

function SignUp() {

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
        //    .then(res => );
    }
    return (
        <div className="container p-5">
            <header>
                <h2>
                Sign up for uPic
                </h2>
            </header>
            <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">

            <form className="p-5 mx-auto">
                <div className="form-group">
                    <input type="text" 
                           className="form-control mb-1" 
                            placeholder="User Name"
                            ref={nameRef} />
                    <input type="email" 
                           className="form-control mb-1" 
                            placeholder="Email"
                            ref={emailRef}  />
                    <input type="password"
                           className="form-control mb-1" 
                            placeholder="Password" 
                            ref={passwordRef}/>
                    <input type="password" 
                           className="form-control mb-1" 
                            placeholder="Confirm Password" 
                            ref={password2Ref}/>
                </div>

                <button type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}>
                        Submit
                 </button>
            </form>
            </div>
           
        </div>
    )
}

export default SignUp
