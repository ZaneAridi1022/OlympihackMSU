import { useState} from 'react'
import {ethers} from 'ethers';
// import { getWallet, getAllTransactions } from '../../utils/Connent';
import { getWallet, getAllTransactions } from '../../utils/Connect';


import './WalletButton.scss'








function WalletButton(){
  const [address, setAddress] = useState("")



  return (
    <div className="wallet-button">
      <button onClick={async () => {
        const address = await getWallet();
        setAddress(address);
        const count = await getAllTransactions(address);
        console.log(count);
      }}>Connect</button>
    </div>
  )
}
export default WalletButton



