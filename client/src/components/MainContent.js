import React, { useState } from 'react'
import SignUp from './SignUp';
import Title from './Title';

function MainContent() {
  
  const [isMainPage, setIsMainPage] = useState(true);
  const [showSignUp, setshowSignUp] = useState(false);
  const showSignUpPage = () => {
    setIsMainPage(false);
    setshowSignUp(true);
  }
  return (
    <div>
      {isMainPage && 
      <div className="container mx-auto" style={{color: "rgb(233,236,239)", height: "100vh", marginTop: "10rem"}}>
        <Title title="Find your Inspiration !!" displaySize="3"/>
        <Title title="Join uPic Community to start a new Photo Contest or to get involved !!" displaySize="7"/>
        <p className="lead">
          <button className="btn btn-secondary btn-lg"
            onClick={showSignUpPage}>
            Start for Free
            </button>
        </p>
      </div>}
      {showSignUp && <SignUp />}
    </div>

  )
}

export default MainContent
