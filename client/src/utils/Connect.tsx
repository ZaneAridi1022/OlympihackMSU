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


async function getAllTransactions(address: ethers.AddressLike) {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.enable();
  
        // Create an ethers provider using MetaMask's provider
        const provider = new ethers.BrowserProvider(window.ethereum);
  
        // Get the transaction history of the address
        const count = await provider.getTransactionCount(address);

        return count;
  
      } catch (error) {
        console.error('Error retrieving transaction history:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }


export {getWallet, getAllTransactions}

  
