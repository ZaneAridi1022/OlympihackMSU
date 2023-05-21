import React from 'react'
import './Taskbar.scss'
import TaskbarButton from './TaskbarButton'

import { getUserDataGithub } from '../../api/GithubAPI';
import { Link, useNavigate } from 'react-router-dom';


interface TaskbarProps {
    label: string,
}
const Taskbar:React.FC<TaskbarProps> = ({
  label
}) => {
  const navigate = useNavigate();
  return (
    <div className="taskbar">
      <div >
          <h3 className="taskbar__logo">TrustLink</h3>
      </div>
      <div className="taskbar__search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="taskbar__actions">
        <TaskbarButton label={'About us'} link={''} />
        {getUserDataGithub()  ?
        <button className="circleAvatar" onClick={() => navigate("/profile")}>
        <img className="profileImage" src={getUserDataGithub().avatar_url}></img>
        </button>
        : <TaskbarButton label={label} link={'/login'} />}
      </div>
    </div>
  )
}

export default Taskbar