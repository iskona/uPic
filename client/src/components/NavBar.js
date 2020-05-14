import React from "react";
import NavListItem from "./NavListItem";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand mb-0" href="/">uPic</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <NavListItem path="/about" menuLabel="About"/>
            <NavListItem path="/login" menuLabel="LogIn"/>
            <NavListItem path="/signup" menuLabel="SignUp"/>
            <NavListItem path="/upload" menuLabel="Upload" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
