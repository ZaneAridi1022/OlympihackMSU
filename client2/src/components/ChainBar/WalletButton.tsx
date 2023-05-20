import { useState} from 'react'
import {ethers} from 'ethers';
// import { getWallet, getAllTransactions } from '../../utils/Connent';
import { getWallet, getAllTransactions } from '../../utils/Connect'


import './WalletButton.scss'


function WalletButton(){
  const [address, setAddress] = useState("")
  const [chains,setChains] = useState(["mainnet","polygon","bsc","fantom","avalanche"])

  return (
    <div className="wallet-button">
      <button onClick={async () => {
        const address = await getWallet();
        setAddress(address);
        const count = await getAllTransactions(address, chains);
        console.log(count);
      }}>Connect</button>
    </div>
  )
}
export default WalletButton



