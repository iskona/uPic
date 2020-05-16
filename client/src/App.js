import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile"
import ContestList from "./components/ContestList";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path={["/", "/main"]} component={MainContent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/about" component={MainContent} />
        <Route exact path = "/profile"  component = {Profile} />
        {/* <Route exact path = "/personalAccount"  component = {Account} /> */}
      </div>
    </Router>
  );
}


export default App;