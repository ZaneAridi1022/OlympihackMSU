/* eslint-disable no-inner-declarations */
import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";

import NFTImage from "../assets/SoulBoundNFTImage.svg"
import GithubLoginScreen from "./GithubLoginScreen";

import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { getUserData, isUserLoggedIn, setUserDataGithub } from "../api/GithubAPI";
import NFTDisplay from "../utils/utils";


function Landing() {



  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({login: '', avatar_url: ''});
  const [commitData, setCommitData] = useState([{repoName:'',
                                                  commits:0,
                                                  stars:0
                                              }]);
  const [contract, setContract] = useState(null);


  useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      console.log(codeParam);

      if (codeParam && (localStorage.getItem("accessToken") === null)) {
          async function getAccessToken() {
              await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
                  method: "GET"
              }).then((response) => {
                  return response.json();
              }).then((data) => {
                  if (data.access_token) {
                      localStorage.setItem("accessToken",data.access_token);
                      setRerender(!rerender);
                  }
              })
          }
          getAccessToken();
      }

  }, []);


  useEffect(() => {

    if (isUserLoggedIn()){

        handleUserData();
    }
    const provider = new ethers.JsonRpcProvider("https://rpc2.sepolia.org");
    const sbAddress = "0x3630486E6F1EB907E86c38178207e50011560De8";
    const sbtAbi = ["function getTokenURI(uint256 _tokenId) public view returns (string memory)"];
    const contractInstance = new ethers.Contract(sbAddress, sbtAbi, provider);
    contractInstance.getTokenURI(1).then((uri) => {
      const decodedURI = atob(uri.split(",")[1]);
      const data = JSON.parse(decodedURI);
      console.log("URI: ",data.image);
      setContract(data.image)
    });  
}, []);

async function handleUserData() {
    const data = await getUserData();
    console.log(data);
    setUserData(data);
    setUserDataGithub(data);

    console.log("userData: ",userData);
}




  return (
    
    <div className={styles.container}>
      <Taskbar />
      <div className="flex flex-row flex-grow justify-around content-center mb-5">

        <div className="flex flex-col justify-center content-center">
          <h1 className={styles.title}>TrustLink</h1>
          <p className={styles.slogan}>Don't Trust, Just Verfiy</p>
        </div>

        <div className="flex flex-col justify-center content-center">
        <img className="object-contain h-96 w-96 border-4" src={contract} alt="NFT" />
        </div>

      </div>
 
    </div>

  );
}

export default Landing;