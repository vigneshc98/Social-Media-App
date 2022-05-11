import React,{useState, useEffect} from 'react';
import './message.css';
import { format } from 'timeago.js';
import axios from 'axios';

export const Message = ({message,own, user, recieverId}) => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [reciever, setReciever] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user?userId=${recieverId}`);
      setReciever(res.data);
    }
    getUser();
  }, [recieverId]);

  // console.log('own:',own,":",reciever?.username);

  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
            <img src={own ? user.profilePicture ? PUBLIC_FOLDER+user.profilePicture:PUBLIC_FOLDER+'/person/noAvatar.png'   : reciever?.profilePicture ?  PUBLIC_FOLDER+reciever.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png' } alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
