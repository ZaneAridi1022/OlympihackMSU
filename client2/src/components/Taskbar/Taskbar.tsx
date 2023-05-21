import React from 'react'
import './Taskbar.scss'
import TaskbarButton from './TaskbarButton'
const Taskbar = () => {
  return (
    <div className='superbar'>

    <div className="taskbar">
    <div className="taskbar__logo">
        <h3>TrustLink</h3>
    </div>
    <div className="taskbar__search">
      <input type="text" placeholder="Search..." />
    </div>
    <div className="taskbar__actions">
      <TaskbarButton label={'About us'} link={''} />
      <TaskbarButton label={'Login'} link={''} />
    </div>
  </div>
    </div>
  )
}

export default Taskbar