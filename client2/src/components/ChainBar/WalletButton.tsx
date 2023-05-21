import React, { useState} from 'react'
import {ethers} from 'ethers';
import { getWallet, getAllTransactions, getNFTS } from '../../utils/Connect'
import { AuthContext } from '../../utils/AuthContext';

import './WalletButton.scss'

function WalletButton(){
  const {chainData, setChainData} = React.useContext(AuthContext);
  return (
    <div className="wallet-button">
      <button 
      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      onClick={async () => {
        const address = await getWallet();
        const data = await getAllTransactions(address);
        // console.log("Transactions", data?.tx_count);
        // console.log("Balances", data?.balances);
        const nfts = await getNFTS(address, '1');
        const chaindata = {"address":address,"tx":data?.tx_count, "balances":data?.balances, "nfts":nfts.total}
        console.log("In wallet Button", chaindata);
        setChainData(chaindata);
      }}>Connect</button>
    </div>
  )
}
export default WalletButton



