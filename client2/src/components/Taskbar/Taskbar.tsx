/* eslint-disable no-inner-declarations */
import React from 'react'
import './Taskbar.scss'
import { loginWithGithub, setUserDataGithub } from '../../api/GithubAPI';

import { useState, useEffect } from 'react';

import { getUserDataGithub } from '../../api/GithubAPI';
import { Link, useNavigate } from 'react-router-dom';
import TaskbarButton from './TaskbarButton';


function Taskbar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({login: '', avatar_url: ''});
    const [rerender, setRerender] = useState(false);


    const [searchText, setSearchText] = React.useState("");
    function handleChangeSearch(e: React.ChangeEvent<any>) {
      setSearchText(e.target.value);
      }

      function handleSearch() {
        if (searchText === "") {
          return;
        }
        navigate("/user/" + searchText);
      }

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
              setUserDataGithub(data);
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

        <div className="taskbar__search">
          <input type="text" placeholder="Search..." onChange={handleChangeSearch} />
          <button className="mx-5 rounded bg-blue-300 px-2 py-1" onClick={handleSearch}>🔍</button>
        </div>
        <div className="taskbar__actions">
          {userData.login !== ''  ?
          <>
          <TaskbarButton label={'About us'} link={''} />
        <button onClick={() => { localStorage.removeItem("accessToken"); setUserData({login: '', avatar_url: ''}); localStorage.removeItem("login");}}>
          Log out
        </button>

          <button className="circleAvatar" onClick={() => navigate("/profile")}>
            <img className="profileImage" src={userData.avatar_url}></img>
          </button>
          </>
          : <button onClick={loginWithGithub}>
              Log in With Github
            </button>}
        </div>
      </div>
    )
  }

export default Taskbar



// import React from 'react'
// import './Taskbar.scss'
// import TaskbarButton from './TaskbarButton'

// import { getUserDataGithub } from '../../api/GithubAPI';
// import { Link, useNavigate } from 'react-router-dom';


// interface TaskbarProps {
//     label: string,
// }
// const Taskbar:React.FC<TaskbarProps> = ({
//   label
// }) => {
//   const navigate = useNavigate();

//   const [searchText, setSearchText] = React.useState("");
//     function handleChangeSearch(e: React.ChangeEvent<any>) {
//       setSearchText(e.target.value);
//       }

//       function handleSearch() {
//         if (searchText === "") {
//           return;
//         }
//         navigate("/user/" + searchText);
//       }
//   return (
//     <div className="taskbar">
//       <div >
//           <h3 className="taskbar__logo">TrustLink</h3>
//       </div>
//       <div className="taskbar__search">
//         <input type="text" placeholder="Search..."  onChange={handleChangeSearch}/>
//         <button className="mx-5 rounded bg-blue-300 px-2 py-1" onClick={handleSearch}>🔍</button>
//       </div>
//       <div className="taskbar__actions">
//         <TaskbarButton label={'About us'} link={''} />
//         {getUserDataGithub()  ?
//         <button className="circleAvatar" onClick={() => navigate("/profile")}>
//         <img className="profileImage" src={getUserDataGithub().avatar_url}></img>
//         </button>
//         : <TaskbarButton label='Login' link={'/login'} />}
//       </div>
//     </div>
//   )
// }

// export default Taskbar