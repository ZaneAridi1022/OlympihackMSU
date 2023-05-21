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
      <button 
      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      onClick={async () => {
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



