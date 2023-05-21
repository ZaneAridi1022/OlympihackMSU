import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";

import "./Landing.scss";
import GithubLoginScreen from "./GithubLoginScreen";


function Landing() {
  return (
    <>
    <Taskbar label="Login"/>
    <div className="container">
      
    </div>
    <div className="remPage">
      <h1>Demo sample</h1>
    <GithubLoginScreen />
    </div>
    </>
  );
}

export default Landing;