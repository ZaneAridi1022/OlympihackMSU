import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";
import NFTImage from "../assets/SoulBoundNFTImage.svg"

function Landing() {
  return (
    <div className="flex flex-col bg-black min-h-screen text-white border-white">
      <Taskbar />
      <div className="flex flex-row flex-grow justify-around content-center mb-5">

        <div className="flex flex-col justify-center content-center">
          <h1 className="text-7xl">Welcome to Trust Link</h1>
          <p className="text-4xl mt-4">Don't Trust, Just Verfiy</p>
        </div>

        <div className="flex flex-col justify-center content-center">
          <img className=" object-contain h-96 w-96 border-4" src={NFTImage} alt="NFT Landing Page"/>
        </div>

      </div>
    </div>
  );
}

export default Landing;