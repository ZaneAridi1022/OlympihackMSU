import {useEffect, useState} from 'react';
import ChainBar from '../components/ChainBar/ChainBar';
import KeplrConnect from '../utils/KeplrConnect';

import {ethers} from 'ethers';

import { getUserDataGithub } from "../api/GithubAPI";

function testingForRiley() {
        // TODO: Test your bullshit here!
    }


function PersonalPage() {

    const [mintAddress, setMintAddress] = useState('');
    const [githubUser, setGithubUser] = useState('');

    function handleChangeGithubUser(e: React.ChangeEvent<any>) {
        setGithubUser(e.target.value);
      }

      function handleChangeMintAddress(e: React.ChangeEvent<any>) {
        setMintAddress(e.target.value);
      }

      async function MintNFT(){
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

        await sbContract.safeMint(mintAddress, githubUser);
    }


    return (
        <>
                    <p>Enter Github Username</p>
                    <input type="text" value={githubUser} onChange={handleChangeGithubUser} />
                    <p>This should be changed to msg.sender later</p>
                    <p>Enter the address to mint to</p>
                    <input  type="text" value={mintAddress} onChange={handleChangeMintAddress}/>
                    <button onClick={MintNFT}>Press to Mint</button>

        </>
    )
}

function ProfilePage() {

    return (
        <>
            <ChainBar />
            <KeplrConnect/>
            <br/>
            <br/>
            <br/>
            <PersonalPage />
        </>
    )
}

export default ProfilePage;