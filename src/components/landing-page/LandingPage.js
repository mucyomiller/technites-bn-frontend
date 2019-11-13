import React from "react";
import "./LandingPage.scss";
import NavBar from "../navbar/navbar";

const LandingPage = () => (
  <div className="container">
    <NavBar />
    <div className="cover">
      <div className="welcome">
        <h5> Welcome to </h5>
        <h1> Barefoot Nomad</h1>
        <h4>Making company travel and accommodation easy and convinient.</h4>
      </div>
    </div>
  </div>
);

export default LandingPage;
