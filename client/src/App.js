import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile"
import ContestList from "./components/ContestList";
import Account from "./components/PersonalAcount/Account";
import ContestForm from "./components/ContestForm";
import ImagePage from "./components/ImagePage";
import ShowContestPage from "./components/ShowContestPage";
import SearchedContests from "./components/SearchedContests";

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
        <Route exact path = "/personalAccount"  component = {Account} />
        <Route exact path = "/hostevents"  component = {ContestForm} />
        <Route exact path = "/contests"  component = {ContestList} />
        <Route exact path = "/image" component = {ImagePage} />
        <Route exact path = "/showcontest" component = {ShowContestPage} />
        <Route exact path = "/search" component = {SearchedContests} />

      </div>
    </Router>
  );
}


export default App;