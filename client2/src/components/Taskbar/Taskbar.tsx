import React from 'react'
import './Taskbar.scss'
import { loginWithGithub } from '../../api/GithubAPI';

import { useState, useEffect } from 'react';

import { getUserDataGithub } from '../../api/GithubAPI';
import { Link, useNavigate } from 'react-router-dom';


function Taskbar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({login: '', avatar_url: ''});
    const [rerender, setRerender] = useState(false);

    async function getUserData() {
          await fetch("http://localhost:4000/getUserData", {
              method: "GET",
              headers: {
                  "Authorization" : "Bearer " + localStorage.getItem("accessToken")
              }
          }).then((response) => {
              return response.json();
          }).then((data) => {
              console.log(data);
              setUserData(data);
          })
    }

    useEffect(() => {
      localStorage.setItem("login",userData.login);
    },[userData])

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

          if (localStorage.getItem("accessToken") ){
              getUserData();
          }

      }, [rerender]);

    return (
      <div className="taskbar">
        {/* <div >
            <h3 className="taskbar__logo">TrustLink</h3>
        </div> */}
        <div className="taskbar__search">
          <input type="text" placeholder="Search..." />
        </div>
        <button onClick={() => { localStorage.removeItem("accessToken"); setUserData({login: '', avatar_url: ''}); localStorage.removeItem("login");}}>
          Log out
        </button>
        <div className="taskbar__actions">
          {userData.login !== ''  ?
          <button className="circleAvatar" onClick={() => navigate("/profile")}>
            <img className="profileImage" src={userData.avatar_url}></img>
          </button>
          : <button onClick={loginWithGithub}>
              Log in With Github
            </button>}
        </div>
      </div>
    )
  }

export default Taskbar