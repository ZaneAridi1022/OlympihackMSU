import React, { useState, useEffect } from 'react'
import './ChainBar.scss'
import WalletButton from './WalletButton'
import { AuthContext } from '../../utils/AuthContext'

// import SelectChains from '../Dropdown/SelectChains';


const ChainBar = () => {
 

  // const [mintChain,onSelect] = useState("mainnet")



  return (
    <div className="taskbar">
    <div className="taskbar__logo">
        <h3>TrustLink</h3>
    </div>
    <div className="taskbar__actions">
      <WalletButton/>
      {/* <SelectChains onSelect={onSelect}/> */}
    </div>
  </div>
  )
}

export default ChainBar