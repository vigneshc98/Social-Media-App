import axios from 'axios';
import React,{useState, useEffect} from 'react'
import './conversation.css'

export const Conversation = ({conversation, currentUser}) => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m)=> m !== currentUser._id);
    const getUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user?userId=${friendId}`);
      setUser(res.data);
    }
    getUser();
  }, [currentUser,conversation]);

  return (
    <div className='conversation'>
        <img src={ user?.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png'} alt="" className="conversationImg" />
        <span className="conversationName">{user ? user.username :'...loading'}</span>
    </div>
  )
}
