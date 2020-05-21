import React, { useState, useEffect } from "react";
import NavListItem from "./NavListItem";
import { useHistory } from 'react-router-dom'
import "../Style/NavBar.css"
import NavSearchForm from "./NavSearchForm"

function Navbar() {
  const history = useHistory()


  const [currentPath, setcurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    return history.listen(location => {
      setcurrentPath(location.pathname);
      console.log(currentPath)
    })
  }, [history])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand mb-0" href="/">uPic</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02"></div>

        {
          (() => {
            switch (currentPath) {
              case "/":
              case "/about":
              case "/login":
              case "/signup":
                return (
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <NavListItem path="/about" menuLabel="About" />
                    <NavListItem path="/login" menuLabel="LogIn" />
                    <NavListItem path="/signup" menuLabel="SignUp" />
                  </ul>
                );
              case "/profile":
              case "/personalAccount":
              case "/hostevents":
                return (
                  <ul className="nav headerNav nav-pills nav-justified profileNav">
                    <NavListItem path="/personalAccount" menuLabel="Account"  className ="nav-item"/>
                    <NavListItem path="/hostevents" menuLabel="HostEvent"  className ="nav-item"  />
                    <NavListItem path="/contests" menuLabel="Contests"  className ="nav-item"/>
                    <NavSearchForm />
                    {/* <li className="nav-item active"><h6><i className="fa fa-bell" /></h6></li> */}
                  </ul>
                )
              case "/contests":
                return (
                  <ul className="nav headerNav nav-pills nav-justified profileNav">
                  <NavListItem path="/personalAccount" menuLabel="Account"  className ="nav-item"/>
                  <NavListItem path="/hostevents" menuLabel="HostEvent"  className ="nav-item"  />
                  <NavSearchForm />
                  {/* <li className="nav-item active"><h6><i className="fa fa-bell" /></h6></li> */}
                </ul>
                )
              default:
                break;
            }
          })
            ()}
      </div>
    </nav>);

}


export default Navbar;
