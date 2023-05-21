/* eslint-disable no-inner-declarations */
import { useEffect, useState } from 'react';

const CLIENT_ID = "f3acba1476f44f131be4";

function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

function GithubLoginScreen() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});

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

    

    return (
        <>
            <h1>Github Login</h1>
            
            {localStorage.getItem("accessToken") ?
                <>
                    <h1>We have the access token</h1>

                    <button onClick={() => { localStorage.removeItem("accessToken"); setRerender(!rerender); }}>
                        Log out
                    </button>

                    <h3>Get User Data from Github API</h3>
                    <button onClick={getUserData}>Get Data</button>
                    {Object.keys(userData).length !== 0 ?
                        <>
                            <h4>Hey there </h4>
                        </>
                    :
                        <></>
                    }
                </>
            :
                <>
                <h3>User is not logged in</h3>
                <button onClick={loginWithGithub}>
                </button>
                </>
            }
            
        </>
    )
}

export default GithubLoginScreen;

