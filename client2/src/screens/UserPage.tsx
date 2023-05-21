/* eslint-disable no-var */
import React from 'react'

import { getCommitsHelper, loginWithGithub, getUserData, isUserLoggedIn } from "../api/GithubAPI";

import { getUserDataGithub } from "../api/GithubAPI";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getWallet, getAllTransactions, getNFTS } from '../utils/Connect';

import { useParams } from 'react-router-dom';

import './UserPage.scss'
import Taskbar from '../components/Taskbar/Taskbar';

const UserPage = () => {

    const { userId } = useParams() as { userId: string };

    const [chainData, setChainData] = useState({} as any);

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

    async function GetUserInfoWithId({ user }: { user: string }) {
        await fetch("http://localhost:4000/getUserInfoWithId?user=" + user, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setUserInfomation(data);
        })
    }

    useEffect(() => {
        GetUserInfoWithId({ user: userId });
    }, [userId]);


    async function handleUserData() {
        const data = await getUserDataGithub();
        if (!data) {
            return;
        }

        await GetUserInfoWithId({ user: userId });

    }
    useEffect(() => {
        handleUserData();
    }, []);



    const [walletAddress, setWalletAddress] = useState('Loading');
    //const walletAddress = 

    async function GetAddressFromGithub(_githubUsername: string) {
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
            setWalletAddress(address);
            const data = await getAllTransactions(address);
            const nfts = await getNFTS(address, '1');
            setChainData({"address":address,"tx":data?.tx_count, "balances":data?.balances, "nfts":nfts.total});

            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(userId);
        GetAddressFromGithub(userId);
    }, [userId])



    return (
        <>
            <Taskbar />
            <div className='h-screen w-full bg-gradient-to-b via-black from-gray-700 to-black text-white'>

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
                            <p>Your total crypto balances: {chainData["balances"]}</p>
                            <p>You have made {chainData["tx"]} transactions on the blockchain</p>
                            <p>You have {chainData['nfts']} nfts</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default UserPage