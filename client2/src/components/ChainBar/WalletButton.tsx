import { useState} from 'react'
import {ethers} from 'ethers';
// import { getWallet, getAllTransactions } from '../../utils/Connent';
import { getWallet, getAllTransactions, getNFTS } from '../../utils/Connect'


import './WalletButton.scss'

function WalletButton(){
  const [address, setAddress] = useState("")
  const [chains,setChains] = useState(["mainnet","polygon","bsc","fantom","avalanche"])

  return (
    <div className="wallet-button">
      <button onClick={async () => {
        const address = await getWallet();
        setAddress(address);
        const data = await getAllTransactions(address, chains);
        console.log("Transactions", data?.tx_count);
        console.log("Balances", data?.balances);
        const nfts = await getNFTS(address, '1');
        console.log('Total NFTS:', nfts.total);
      }}>Connect</button>
    </div>
  )
}
export default WalletButton



