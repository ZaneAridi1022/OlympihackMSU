import React from 'react'

import './TaskbarButton.scss'

interface TaskbarButtonProps {
    label: string,
    link: string,
}

const TaskbarButton:React.FC<TaskbarButtonProps> = ({
    label,
    link,
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