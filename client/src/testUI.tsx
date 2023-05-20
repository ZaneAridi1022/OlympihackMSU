import React from 'react'

import UserRow from '../../client2/components/userrow/UserRow'

const TestUI = () => {
  return (
    <>
        <UserRow id={1} name='John Doe' github='johndoe' />
        <UserRow id={2} name='Jane Doe' github='janedoe' />
        
    </>
  )
}

export default TestUI