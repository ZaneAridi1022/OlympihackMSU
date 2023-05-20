import { useEffect, useState } from 'react';

const CLIENT_ID = "f3acba1476f44f131be4";

function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

function GithubLoginScreen() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({name: null, avatar_url: ''});

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

    }, []);

    // useEffect(() => {
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
    // }, [userData]);

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
                            {/* get the name and avatar url and add show it on the screen */}
                            <h3>{userData["name"]}</h3>
                            <img src={userData["avatar_url"]} alt="avatar" />
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

