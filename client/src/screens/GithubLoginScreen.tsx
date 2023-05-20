import { useEffect } from 'react';

const CLIENT_ID = "f3acba1476f44f131be4";

function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

function GithubLoginScreen() {

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);
    }, []);

    return (
        <>
            <h1>Github Login</h1>
            <button onClick={loginWithGithub}>
                Login with Github
            </button>
        </>
    )
}

export default GithubLoginScreen;

