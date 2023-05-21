import {ethers} from 'ethers';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();



async function getNFTS(address: ethers.AddressLike,chainID: string){
  const apiKey = '4f4f21a2e24c44419584c3aa8dce3188'
  const apiSecret = '450694e1fb474e00a325678065a460fe'
  const auth = btoa(`${apiKey}:${apiSecret}`);
  const chainId = chainID;
  const walletAddress= address;
  const {data} = await axios.get(`https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/nfts`, {
    headers: {
        Authorization: `Basic ${auth}`,
      }
  });
  return data;
}

async function getWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    const signer = provider.getSigner();
    console.log(account);
    return account;
  }

async function getAllTransactions(address: ethers.AddressLike) {
    let count = 0;
    let balances = BigInt(0);
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.enable();
          // Create an ethers provider using MetaMask's provider
            const provider = new ethers.BrowserProvider(window.ethereum);
          // Get the transaction history of the address
            const ethCount = await provider.getTransactionCount(address);
            const ETHbalance = await provider.getBalance(address);
            const ethBalance = ethers.toBigInt(ETHbalance);
            count += ethCount;
            balances += ethBalance;
            const Polygon = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
            const PolygonCount = await Polygon.getTransactionCount(address);
            const MATICbalance = await Polygon.getBalance(address);
            const polygonBalance = ethers.toBigInt(MATICbalance);
            count += PolygonCount;
            balances += polygonBalance;
            const Fantom = new ethers.JsonRpcProvider("https://rpcapi.fantom.network/");
            const FantomCount = await Fantom.getTransactionCount(address);
            count += FantomCount;
            const FTMbalance = await Fantom.getBalance(address);
            const fantomBalance = ethers.toBigInt(FTMbalance);
            balances += fantomBalance;
            const Avalanche = new ethers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
            const AvalancheCount = await Avalanche.getTransactionCount(address);
            count += AvalancheCount;
            const Avaxbalance = await Avalanche.getBalance(address);
            const avalancheBalance = ethers.toBigInt(Avaxbalance);
            balances += avalancheBalance;

        const return_json = {tx_count: count, balances: ethers.formatEther(balances)}
        console.log(return_json);
        return return_json;
  
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }

export {getWallet, getAllTransactions, getNFTS}

  
