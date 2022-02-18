import React from 'react'

const Message = (props) => {
  const user = props.user

  return (
    <div className='message'>
      <div className='info'>
        <div className='authorName'>{user.name}</div>
        <div className='body'>{user.message}</div>
        <div className='time'>{user.time}</div>
      </div>
    </div>
  )
}

export default Message
