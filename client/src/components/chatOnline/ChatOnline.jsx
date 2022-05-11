import axios from 'axios';
import React,{useState, useEffect} from 'react';
import './chatOnline.css';

export const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/user/friends/${currentId}`);
        setFriends(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [currentId]);


  useEffect(() => {
    setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));
  }, [friends,onlineUsers])

  const handleClick = async (oUser)=>{
    try {
      const res = await axios.get(`http://localhost:8800/api/conversation/find/${currentId}/${oUser._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(onlineUsers);
  return (
    <div className="chatOnline">
        {onlineFriends.map((o)=>{
            return(
              <div className='chatOnlineFriend' key={o?._id} onClick={()=>handleClick(o)}>
                <div className="chatOnlineImgContainer">
                    <img src={o?.profilePicture ? PUBLIC_FOLDER+o.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png'} alt="" className='chatOnlineImg'/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{o.username}</span>
              </div>
            )
        })}
   </div>
  )
}
