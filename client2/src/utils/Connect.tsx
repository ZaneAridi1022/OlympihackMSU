import {ethers} from 'ethers';


async function getWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];

    const signer = provider.getSigner();

    const address = await (await signer).getAddress();
    console.log(address);
    const count = await provider.getTransactionCount(address);
    return address;
  }


async function getAllTransactions(address: ethers.AddressLike, chains: string[] = ["mainnet", "polygon"]) {
    let count = 0;
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.enable();
        if (chains.includes("mainnet")) {
          // Create an ethers provider using MetaMask's provider
          const provider = new ethers.BrowserProvider(window.ethereum);
          // Get the transaction history of the address
           const ethCount = await provider.getTransactionCount(address);
           count += ethCount;
        }
        if (chains.includes("polygon")) {
            const Polygon = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
            const PolygonCount = await Polygon.getTransactionCount(address);
            count += PolygonCount;
        }
        if (chains.includes("bsc")) {
            const BSC = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
            const BSCCount = await BSC.getTransactionCount(address);
            count += BSCCount;
        }
        if (chains.includes("fantom")) {
            const Fantom = new ethers.JsonRpcProvider("https://rpcapi.fantom.network/");
            const FantomCount = await Fantom.getTransactionCount(address);
            count += FantomCount;
        }
        if (chains.includes("avalanche")) {
            const Avalanche = new ethers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
            const AvalancheCount = await Avalanche.getTransactionCount(address);
            count += AvalancheCount;
        }
        return count;
  
      } catch (error) {
        console.error('Error retrieving transaction history:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }


export {getWallet, getAllTransactions}

  
