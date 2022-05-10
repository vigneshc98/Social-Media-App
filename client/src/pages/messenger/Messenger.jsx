import React from 'react'
import './messenger.css'
import { Topbar } from '../../components/topbar/Topbar'
import { Conversation } from '../../components/conversations/Conversation'

export const Messenger = () => {
  return (
    <>
      <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for friends' className="chatMenuInput" />
            <Conversation/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper"></div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  )
}
