import React from 'react'

interface UserRowProps {
    user: {
        id: number,
        name: string,
        github: string,
        
    }
}

const UserRow = () => {
  return (
    <div>UserRow</div>
  )
}

export default UserRow