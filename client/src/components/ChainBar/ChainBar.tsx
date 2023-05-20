import React from 'react'
import './ChainBar.scss'
import WalletButton from './WalletButton'
const ChainBar = () => {
  return (
    <div className="taskbar">
    <div className="taskbar__logo">
        <h3>TrustLink</h3>
    </div>
    <div className="taskbar__actions">
      <WalletButton/>
    </div>
  </div>
  )
}

export default ChainBar