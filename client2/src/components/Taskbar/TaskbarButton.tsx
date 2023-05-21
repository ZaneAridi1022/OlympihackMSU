import React from 'react'

import { Link } from 'react-router-dom'

import './TaskbarButton.scss'

interface TaskbarButtonProps {
    label: string,
    link: string,
    
    onClickFunction?: () => void,
}

const TaskbarButton:React.FC<TaskbarButtonProps> = ({
    label,
    link,
    onClickFunction,
}) => {
  return (
    <>
    <div className='TaskBarButton'>
    <Link className='ATAG' to={link} onClick={onClickFunction}>

        <span></span>
        <span></span>
        <span></span>
        
    {label}</Link>
    </div>
    </>
  )
}

export default TaskbarButton