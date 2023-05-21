/* eslint-disable no-var */
import React from 'react'

import { getCommitsHelper, loginWithGithub, getUserData, isUserLoggedIn } from "../api/GithubAPI";

import { getUserDataGithub } from "../api/GithubAPI";
import { useState, useEffect } from 'react';
import {ethers} from 'ethers';

import { useParams } from 'react-router-dom';

import './UserPage.scss'
import Taskbar from '../components/Taskbar/Taskbar';

const UserPage = () => {


        const { userId } = useParams() as { userId: string };

        
        const [commitData, setCommitData] = useState([{repoName:'',
        commits:0,
        stars:0
    }]);
    
    const [userInfomation, setUserInfomation] = useState({
        "login": "",
        "name": "",
        "avatar_url": "",
        "hashtags": [],
        "bio": "",
        "UserScore": 0,
        "Github Contributions": [],
        "blockchain-contributions": []
    });

    async function GetUserInfoWithId({user}: {user: string}) {
        await fetch("http://localhost:4000/getUserInfoWithId?user="+user, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setUserInfomation(data);
        })
    }

    useEffect(() => {
        GetUserInfoWithId({user: userId});
    }, [userId]);


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

        // useEffect(() => {

        // },[commitData]);

        useEffect(() => {
            getCommitHistory({user: userId});
            console.log(commitData);
        }, [userId]);
        

        async function handleUserData() {
            const data = await getUserDataGithub();
            if (!data) {
                return;
            }

            await GetUserInfoWithId({user: userId});


  
        }
        useEffect(() => {
            handleUserData();
        }, []);


    
        const [walletAddress, setWalletAddress] = useState('Loading');
        //const walletAddress = 
    
        async function GetAddressFromGithub(_githubUsername :string){
            try {
            //const ethereum = (window as any).ethereum;
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.BrowserProvider(window.ethereum)
    
            // MetaMask requires requesting permission to connect users accounts
            await provider.send("eth_requestAccounts", []);
    
            const sbAddress = "0x3630486E6F1EB907E86c38178207e50011560De8"
    
            // The ERC-20 Contract ABI, which is a common contract interface
            // for tokens (this is the Human-Readable ABI format)
            const sbtAbi = [
                "function getAddressByGithub(string memory _githubUsername) public view returns(address)",
                "function safeMint(address to, string memory githubUsername) public"
            ];
    
            const sbContract = new ethers.Contract(sbAddress, sbtAbi, provider);
    
            const address = await sbContract.getAddressByGithub(_githubUsername);
            setWalletAddress(address)
            } catch (error) {
                console.log(error);
            }
        }
    
        useEffect(()=>{
            GetAddressFromGithub(userId);
        }, [])

    

   

    // if (getUserDataGithub() && userId === getUserDataGithub().login){
    //     return (<>
    //         <h1>This is my page! </h1>
    //     </>)
    // }
    
    return (
        <>
            <Taskbar label="Login" />
            <div className='conintainer'>

                <div className='LeftPane'>
                    <h1>Profile</h1>
                    <img src={userInfomation["avatar_url"]} className='LeftPane__ProfileImage' alt="user123" />
                    <h2>{userInfomation["name"]}</h2>
                    <h2>{userInfomation["login"]}</h2>

                    <h3>Hashtags</h3>
                    <div className="hashtags">
                        {
                            ["BlockChain", "NFT", "CRYPTO"].map((hashtag: any) => {
                                return (
                                    <p className='hashtags__tags'> # {hashtag}</p>
                                )
                            })
                        }
                        
                    </div>
                    <h3>Wallet Address</h3>
                    <p>{walletAddress}</p>

                    <h3>Score</h3>
                    <p>{userInfomation["UserScore"]}</p>
                    <h3>Bio</h3>
                    <p>{userInfomation["bio"]}</p>
                </div>
                <div className="rightpange">
                    <h1>BlockChain Contribututions</h1>
                    {/* <div className="post">
                        {
                            userInfomation["blockchain-contributions"].map((blockchainContribution: any) => {
                                return (
                                    <>
                                        <h2>{blockchainContribution["name"]}</h2>
                                        <p>{blockchainContribution["description"]}</p>

                                    </>
                                )
                            })
                        }
                    </div>

                    <h1>
                        Github Contributions
                    </h1>
                    <div className="post">
                        {
                            userInfomation["Github Contributions"].map((: any) => {
                                return (
                                    <>
                                        <h2>{githubContribution["RepoName"]}</h2>
                                        <p>stars: {githubContribution["stars"]}</p>
                                        <p>number of commits {githubContribution.commit.length }</p>

                                    </>
                                )
                            })
                        }

                    </div> */}

                </div>
            </div>

        </>
    )
}

export default UserPage