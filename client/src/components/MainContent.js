import React, { useState } from 'react'
import SignUp from './SignUp';
import Title from './Title';
import "../Style/MainContent.css";


function MainContent() {
  const [isMainPage, setIsMainPage] = useState(true);
  const [showSignUp, setshowSignUp] = useState(false);
  const showSignUpPage = () => {
    setIsMainPage(false);
    setshowSignUp(true);
  }

  return (
    <div className="mainBg">
      {isMainPage &&
        <div className="container homepageDiv mx-auto" style={{ color: "rgb(233,236,239)", height: "100vh"}}>
          <Title title="Find your Inspiration" displaySize="4" />
          <Title title="Join uPic Community to start a new Photo Contest or to get involved" displaySize="7" />
          <br></br>
          <p className=" row lead">
            <button className="btn btn-secondary btn-lg homePageButton"
              onClick={showSignUpPage}>
              Start for Free
            </button>
          </p>
        </div>}
      {showSignUp && <SignUp />}
    </div>
  )
}

export default MainContent;
