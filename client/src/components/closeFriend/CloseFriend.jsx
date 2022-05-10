import React from 'react';
import './closeFriend.css'

export const CloseFriend = ({user}) => {
 
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const {profilePicture, username} = user;

    return (
    <li className="sidebarFriend">
        <img src={PUBLIC_FOLDER+profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{username}</span>
    </li>
  )
}
