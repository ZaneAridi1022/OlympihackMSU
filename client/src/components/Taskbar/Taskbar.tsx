import React from 'react'
import './Taskbar.scss'
import TaskbarButton from './TaskbarButton'
const Taskbar = () => {
  return (
    <div className="taskbar">
      <div >
          <h3 className="taskbar__logo">TrustLink</h3>
      </div>
      {/* <div className="taskbar__search">
        <input type="text" placeholder="Search..." />
      </div> */}
      <div className="taskbar__actions">
        {/* <TaskbarButton label={'About us'} link={''} /> */}
        <TaskbarButton label={'Connect MetaMask'} link={''} />
      </div>
    </div>
  )
}

export default Taskbar