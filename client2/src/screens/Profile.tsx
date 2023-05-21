/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-var */
import React, { useContext, useEffect, useState } from 'react';
import ChainBar from '../components/ChainBar/ChainBar';
import KeplrConnect from '../utils/KeplrConnect';

import { ethers } from 'ethers';

import { getCommitsHelper, getUserDataGithub } from "../api/GithubAPI";
import { AuthContext } from '../utils/AuthContext';

const MyProfileThingy = () => {

    if (getUserDataGithub() === null) {
        return (
            <>
            </>
        )
    }
    const [commitData, setCommitData] = useState([{
        repoName: '',
        commits: 0,
        stars: 0
    }]);

    const [userInfomation, setUserInfomation] = useState({
        "username": "",
        "actual_name": "",
        "nftpicture": "",
        "hashtags": [],
        "bio": "",
        "UserScore": 0,
        "Github Contributions": [],
        "blockchain-contributions": []
    });

    async function getCommitHistory({ user }: { user: string }) {
        await fetch("http://localhost:4000/getRepos?user=" + user, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
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

            data.map((repo: { stargazers_count: 0, name: '', owner: { login: '' } }) => {
                if (repo["stargazers_count"] > max1) {
                    max1 = repo["stargazers_count"];
                    max1name = repo["name"];
                    max1owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max2) {
                    max2 = repo["stargazers_count"];
                    max2name = repo["name"];
                    max2owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max3) {
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

    // useEffect(() => {
    //     getCommitHistory({user: userId});
    //     console.log(commitData);
    // }, [userId]);


    async function handleUserData() {
        const data = await getUserDataGithub();
        if (!data) {
            return;
        }

        const userInfomation = {
            "username": data.login,
            "actual_name": data.name,
            "nftpicture": data.avatar_url,
            "hashtags": ["crypto", "blockchain", "NFTs"],
            "bio": data.bio,
            "UserScore": 1300,
        }
        setUserInfomation(userInfomation);
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
            setWalletAddress(address)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(()=>{
    //     GetAddressFromGithub(userInfomation["username"]);
    // }, [])

    //BLOCKCHAIN DATA 
    const {chainData} = React.useContext(AuthContext);

    console.log("FROM SHIT",chainData);


    return (
        <>
            <div className='conintainer'>

                <div className='LeftPane'>
                    <h1>Profile</h1>
                    <img src={userInfomation["nftpicture"]} className='LeftPane__ProfileImage' alt="user123" />
                    <h2>{userInfomation["actual_name"]}</h2>
                    <h2>{userInfomation["username"]}</h2>

                    <h3>Hashtags</h3>
                    <div className="hashtags">
                        {
                            userInfomation["hashtags"].map((hashtag: any) => {
                                return (
                                    <p className='hashtags__tags'> # {hashtag}</p>
                                )
                            })
                        }
                    </div>
                    {/* <h3>Wallet Address</h3>
                    <p>{walletAddress}</p> */}

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


function PersonalPage() {

    if (getUserDataGithub() === null) {
        return (
            <>
                <h1 className=''>Not logged in</h1>
            </>
        )
    }


    const [mintAddress, setMintAddress] = useState('');
    const [githubUser, setGithubUser] = useState(getUserDataGithub().login);

    const [walletAddress, setWalletAddress] = useState('');
    const {chainData} = useContext(AuthContext);

    console.log(chainData);

    // function handleChangeGithubUser(e: React.ChangeEvent<any>) {
    //     setGithubUser(e.target.value);
    //   }

    function handleChangeMintAddress(e: React.ChangeEvent<any>) {
        setMintAddress(e.target.value);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
    // useEffect(() => {
    //     const ethereum = (window as any).ethereum;
    //     const accounts = await ethereum.request({
    //         method: "eth_requestAccounts",
    //     });
    //     console.log(accounts[0]);
    // }, []);
    async function SetCodeForHidden(){
        const ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        SetCodeForHidden();
    }, []);

    async function MintNFT() {
        const ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(ethereum)
        const walletAddress = accounts[0]    // first account in MetaMask
        const signer = await provider.getSigner(walletAddress)

        const sbAddress = "0x3630486E6F1EB907E86c38178207e50011560De8"

        // The ERC-20 Contract ABI, which is a common contract interface
        // for tokens (this is the Human-Readable ABI format)
        const sbtAbi = [
            "function getAddressByGithub(string memory _githubUsername) public view returns(address)",
            "function safeMint(address to, string memory githubUsername) public"
        ];

        const sbContract = new ethers.Contract(sbAddress, sbtAbi, signer);

        // The DAI Contract is currently connected to the Provider,
        // which is read-only. You need to connect to a Signer, so
        // that you can pay to send state-changing transactions.
        //const sbContractwithSigner = sbContract.connect(signer);
        if (walletAddress === undefined) {
            console.log("walletAddress is undefined")
            return;
        }
        console.log("walletAddress: ", walletAddress)


        await sbContract.safeMint(walletAddress, githubUser);
    }


    return (
        <>
            <div className='mx-auto w-2/4 grid gap-6 mb-6 bg-gray-700 md:grid-cols-1 rounded-xl px-10 py-10'>
                <h1 className='text-3xl text-white font-bold text-center '>Mint NFT</h1>
                <p className='text-white'>Your Github Username</p>
                {/* <input disabled type="text" className='' value={githubUser} /> */}
                <div className="flex items-center border rounded-lg p-2">
                    <input disabled type="text" className="fbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={githubUser} />
                </div>
                <p className='text-white'>This should be changed to msg.sender later</p>
                <p className='text-white'>Enter the address to mint to</p>
                <input disabled className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={walletAddress} onChange={handleChangeMintAddress} />
                <br />
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={MintNFT}>Press to Mint</button>
            </div>

        </>
    )
}

function ProfilePage() {

    return (
        <>
            <ChainBar />
            <KeplrConnect />
            <br />
            <br />
            <br />
            <PersonalPage />


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <MyProfileThingy />

        </>
    )
}

export default ProfilePage;