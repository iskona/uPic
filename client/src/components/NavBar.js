import React, { useState, useEffect } from "react";
import NavListItem from "./NavListItem";
import { useHistory } from 'react-router-dom'
import "../Style/NavBar.css"
import NavSearchForm from "./NavSearchForm"
import API from "../utils/API";
//import { StreamApp, NotificationDropdown  } from 'react-activity-feed';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
let stream = require('getstream');

function Navbar() {
  const history = useHistory()
  const [currentPath, setcurrentPath] = useState(window.location.pathname);
  //const [notificationState, setNotificationState] = useState(false);

  let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXBpYyJ9.k1P-ctjAM1fjTxQQATPIpwUGlEIUipaTfh_U_59goyc"
  let client = stream.connect('cbam34cnp437', userToken, '80330')
  var notification = client.feed('notification', 'upic');
  var subscription;

  useEffect(() => {
    return history.listen(location => {
      setcurrentPath(location.pathname);
      console.log(currentPath)
    })
  }, [history])

  useEffect(() => {
    //subscribe to any events
    var subscription = notification.subscribe(function(data) {
      let notificationmessage = JSON.parse(data.new[0].object);
      NotificationManager.success(notificationmessage.title, notificationmessage.message, 5000,()=>{
        window.location.replace(notificationmessage.redirecturl)
      });
    });
  }, [])

  const initNotifications = ()=> {
    notification.get().then((data)=> {
      data.results[0].activities.slice(0,5).forEach(activity => {
        let notificationmessage = JSON.parse(activity.object);
        NotificationManager.success(notificationmessage.title, notificationmessage.message, 5000, ()=>{
          window.location.replace(notificationmessage.redirecturl)
        });
      })
    });
  }

  const handleLogout = () =>{
    API.logoutUser().then(res => console.log("Successfully logged out"))
    subscription.cancel();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand mb-0" href="/">uPic</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

        {
          (() => {
            switch (currentPath) {
              case "/":
              case "/about":
              case "/login":
              case "/signup":
                return (
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ml-auto">
                    <NavListItem path="/about" menuLabel="About" />
                    <NavListItem path="/signup" menuLabel="SignUp" />
                    <NavListItem path="/login" menuLabel="LogIn" />
                  </ul>
                );
              case "/profile":
              case "/personalAccount":
              case "/hostevents":
              case "/search":
                return (
                  <ul className="nav headerNav nav-pills nav-justified profileNav  ml-auto">
                    <NavListItem path="/personalAccount" menuLabel="Account"  className ="nav-item"/>
                    <NavListItem path="/hostevents" menuLabel="HostEvent"  className ="nav-item"  />
                    <NavListItem path="/contests" menuLabel="Contests"  className ="nav-item"/>
                    <NavSearchForm />
                    {/* <NavListItem path="/notification" menuLabel="HostEvent"  className ="nav-item"  /> */}
                    <NavListItem path="/" menuLabel="Logout"  className ="nav-item" onClick ={handleLogout}/>
                    <li onClick = {initNotifications} className="nav-item active"><h6><i className="fa fa-bell" /></h6></li> 
                    <NotificationContainer/>
                  </ul>
                )
              case "/contests":
                return (
                  <ul className="nav headerNav nav-pills nav-justified profileNav  ml-auto">
                  <NavListItem path="/personalAccount" menuLabel="Account"  className ="nav-item"/>
                  <NavListItem path="/hostevents" menuLabel="HostEvent"  className ="nav-item"  />
                  <NavSearchForm />
                  <NotificationContainer/>
                  <li onClick = {initNotifications}  className="nav-item active"><h6><i className="fa fa-bell pt-3"/></h6></li> 

                  <NavListItem path="/" menuLabel="Logout"  className ="nav-item" onClick ={handleLogout}/>
                </ul>
                )
              default:
                break;
            }
          })
            ()}
      </div>
      </div>
    </nav>);

}


export default Navbar;
