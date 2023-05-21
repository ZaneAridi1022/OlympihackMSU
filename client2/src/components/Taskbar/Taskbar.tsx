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

  const [searchText, setSearchText] = React.useState("");
    function handleChangeSearch(e: React.ChangeEvent<any>) {
      setSearchText(e.target.value);
      }

      function handleSearch() {
        if (searchText === "") {
          return;
        }
        navigate("/user/" + searchText);
      }
  return (
    <div className="taskbar">
      <div >
          <h3 className="taskbar__logo">TrustLink</h3>
      </div>
      <div className="taskbar__search">
        <input type="text" placeholder="Search..."  onChange={handleChangeSearch}/>
        <button className="mx-5 rounded bg-blue-300 px-2 py-1" onClick={handleSearch}>🔍</button>
      </div>
      <div className="taskbar__actions">
        <TaskbarButton label={'About us'} link={''} />
        {getUserDataGithub()  ?
        <button className="circleAvatar" onClick={() => navigate("/profile")}>
        <img className="profileImage" src={getUserDataGithub().avatar_url}></img>
        </button>
        : <TaskbarButton label='Login' link={'/login'} />}
      </div>
    </div>
  )
}

export default Taskbar