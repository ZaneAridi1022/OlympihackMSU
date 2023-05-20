import React from 'react'

import './TaskbarButton.scss'

interface TaskbarButtonProps {
    label: string,
    link: string,
    onClick: 
}

const TaskbarButton:React.FC<TaskbarButtonProps> = ({
    label,
    link,
    onClick,
}) => {
  return (
    <>
    <div className='TaskBarButton'>
    <a href={link}>

        <span></span>
        <span></span>
        <span></span>
    {label}</a>
    </div>
    </>
  )
}

export default TaskbarButton