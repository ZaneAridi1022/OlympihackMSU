/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */
import { useEffect, useState } from 'react';

import { getCommitsHelper, loginWithGithub, getUserData, isUserLoggedIn, setUserDataGithub } from "../api/GithubAPI";
// import { wait } from '@testing-library/user-event/dist/utils';

// const CLIENT_ID = "f3acba1476f44f131be4";

// function loginWithGithub() {
//     window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
// }

function GithubLoginScreen() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({login: '', avatar_url: ''});
    const [commitData, setCommitData] = useState([{repoName:'',
                                                    commits:0,
                                                    stars:0
                                                }]);


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
        console.log("CommitData: ",commitData)
    },[commitData])

    

    useEffect(() => {

        if (isUserLoggedIn()){

            handleUserData();
        }
        
    }, []);

    async function handleUserData() {
        const data = await getUserData();
        console.log(data);
        setUserData(data);
        setUserDataGithub(data);
    }

    async function getCommitHistory({user}: {user: string}) {
        await fetch("http://localhost:4000/getRepos?user="+user, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            //setCommitData(data);
            var max1 = -1;
            var max1name = '';
            var max1owner = '';
            var max2 = -1;
            var max2name = '';
            var max2owner = '';
            var max3 = -1;
            var max3name = '';
            var max3owner = '';

            data.map((repo: {stargazers_count:0,name:'',owner:{login:''}}) => {
                if (repo["stargazers_count"] > max1)
                {
                    max1 = repo["stargazers_count"];
                    max1name = repo["name"];
                    max1owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max2)
                {
                    max2 = repo["stargazers_count"];
                    max2name = repo["name"];
                    max2owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max3)
                {
                    max3 = repo["stargazers_count"];
                    max3name = repo["name"];
                    max3owner = repo["owner"]["login"];
                }
            })

            Promise.all([
                            getCommitsHelper({ user: user, owner: max1owner, repoName: max1name }),
                            getCommitsHelper({ user: user, owner: max2owner, repoName: max2name }),
                            getCommitsHelper({ user: user, owner: max3owner, repoName: max3name })
                        ])
                        .then((commitNums) => {
                            const [num1, num2, num3] = commitNums;
                            // setCommitNum1(num1);
                            // setCommitNum2(num2);
                            // setCommitNum3(num3);
                            setCommitData([
                            {
                                repoName: max1name,
                                commits: num1,
                                stars: max1
                            },
                            {
                                repoName: max2name,
                                commits: num2,
                                stars: max2
                            },
                            {
                                repoName: max3name,
                                commits: num3,
                                stars: max3
                            }
                            ]);
                            
                        })
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
                    <button onClick={handleUserData}>Get Data</button>
                    {Object.keys(userData).length !== 2 ?
                        <>
                            {/* get the name and avatar url and add show it on the screen */}
                            <h3>{userData["login"]}</h3>
                            <img src={userData["avatar_url"]} alt="avatar" />
                            <button onClick={() => getCommitHistory({ user: userData["login"] })}>
                                Get Commit History
                            </button>
                        </>
                    :
                        <>
                            <h1>No user data</h1>
                        </>
                    }
                </>
            :
                <>
                <h3>User is not logged in</h3>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={loginWithGithub}>
                    Log in With Github
                </button>
                </>
            }
            
        </>
    )
}

export default GithubLoginScreen;

