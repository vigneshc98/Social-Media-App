import React from 'react'
import './conversation.css'

export const Conversation = () => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='conversation'>
        <img src={PUBLIC_FOLDER+'/person/1.jpeg'} alt="" className="conversationImg" />
        <span className="conversationName">John Doe</span>
    </div>
  )
}
