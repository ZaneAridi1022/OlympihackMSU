import React from 'react'
import './UserRow.scss'

interface UserRowProps {
      id: number,
      name: string,
      github: string,
}

const UserRow: React.FC<UserRowProps> = (
  {
    id,
    name,
    github,
  }

) => {
  return (
    <>
      <div className='UserRow'>
        <div className='UserRow__id'>{id}</div>
        <div className='UserRow__name'>{name}</div>
        <div className='UserRow__github'>{github}</div>
      </div>
    </>
  )
}

export default UserRow