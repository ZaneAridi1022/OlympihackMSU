import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";


function Landing() {
  return (
    <>
      <Taskbar />
      <div className="flex flex-col flex-grow bg-black text-white">
        <h1>Welcome to TrustLink</h1>

      </div>
    </>
  );
}

export default Landing;