import React, { useState, useEffect } from 'react'
import SignUp from './SignUp';
import Title from './Title';
import Img1 from '../Style/Img/7.jpg';
import Img2 from '../Style/Img/8.jpg';
import Img3 from '../Style/Img/11.jpg';
import Img4 from '../Style/Img/9.jpg';

function MainContent() {
  const [isMainPage, setIsMainPage] = useState(true);
  const [showSignUp, setshowSignUp] = useState(false);
  const showSignUpPage = () => {
    setIsMainPage(false);
    setshowSignUp(true);
  }

  const backgrounds = [Img1, Img2, Img3, Img4];
  let bgStyle = {
    backgroundImage: "url(" + backgrounds[2] + ")"
  };
  let current = 0;

  const nextBackground = () => {
    current++;
    current = current % backgrounds.length;
    console.log(current);
    return bgStyle = {
      backgroundImage: "url(" + backgrounds[current] + ")"
    };
    // return bgStyle;
  };

  useEffect(() => {
    // nextBackground();
    // const interval = setInterval(nextBackground, 5000);
    // return () => {
    //   clearInterval(interval)
    // }
  }, []);

  return (
    <div className="mainBg" style={bgStyle}>
      {isMainPage &&
        <div className="container homepageDiv mx-auto" style={{ color: "rgb(233,236,239)", height: "100vh" }}>
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
};

export default MainContent;