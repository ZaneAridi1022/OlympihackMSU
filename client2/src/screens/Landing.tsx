import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";
import NFTImage from "../assets/SoulBoundNFTImage.svg";
import styles from "./Landing.module.scss";

function Landing() {
  return (
    
    <div className={styles.container}>
      <Taskbar />
      <div className="flex flex-row flex-grow justify-around content-center mb-5">

        <div className="flex flex-col justify-center content-center">
          <h1 className={styles.title}>TrustLink</h1>
          <p className={styles.slogan}>Don't Trust, Just Verfiy</p>
        </div>

        <div className="flex flex-col justify-center content-center">
          <img className=" object-contain h-96 w-96 border-4" src={NFTImage} alt="NFT Landing Page"/>
        </div>

      </div>
    </div>
  );
}

export default Landing;