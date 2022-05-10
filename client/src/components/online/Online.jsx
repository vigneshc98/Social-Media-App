import React from 'react'
import './online.css'

export const Online = ({user}) => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const {profilePicture, username} = user;

  return (
    <div>
        <li className="rightbarFriend">
          <div className="rightbarProfileImgContainer">
            <img src={PUBLIC_FOLDER+profilePicture} alt="" className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
          </div>
           <span className="rightbarUsername">{username}</span>
        </li>
    </div>
  )
}
