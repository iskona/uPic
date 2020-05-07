import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar"
import MainContent from "./components/MainContent"
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
    </Router>
  );
}


export default App;
