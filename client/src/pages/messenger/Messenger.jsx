import React, { useContext,useState, useEffect, useRef } from 'react'
import './messenger.css'
import { Topbar } from '../../components/topbar/Topbar'
import { Conversation } from '../../components/conversations/Conversation'
import { Message } from '../../components/message/Message'
import { ChatOnline } from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {io} from 'socket.io-client';

export const Messenger = () => {

  const {user} = useContext(AuthContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const socket = useRef(io('ws://localhost:8900'));  not recomended adding inside bcz it connect to socket server on every re-render of Messenger compnent.
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [friends, setFriends] = useState([]);

  const scrollRef = useRef();
  const searchFriend = useRef();

  useEffect(() => {
    const getConversationn = async () =>{
      try {
        const  res = await axios.get(`http://localhost:8800/api/conversation/${user._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConversationn();
  }, [user]);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior:"smooth"});
  }, [messages]);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');

    socket.current.on('getMessage',(data)=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, []);
  
  
  useEffect(() => {
    socket.current.emit('addUser', user?._id);
    socket.current.on('getUsers',(users)=>{
      setOnlineUser(user.followings.filter((f)=> users.some((u)=> u.userId === f)));
    });

    const fetchFriends = async () => {
      if(user?._id!==undefined){
        try {
          const friendList = await axios.get(`http://localhost:8800/api/user/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchFriends();
    
  }, [user]);  

  useEffect(() => {
    friends.length!=0 && friends.forEach((f)=> socket.current.emit('addUserFriends', f._id) );
  }, [friends]);
  

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev)=>[...prev, arrivalMessage]);
  }, [arrivalMessage,currentChat]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const recieverId = currentChat.members.find((member)=> member !== user._id);

    socket.current.emit('sendMessage', {
      senderId: user._id,
      recieverId,
      text: newMessage
    });

    try {
      const res = await axios.post(`http://localhost:8800/api/message`,message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  const searchFriends = async (e) => {
    e.preventDefault();
    const searchF_array = friends.filter((f)=>f.username === searchFriend.current.value);

    if(searchF_array.length==0){
      return console.error("no friend found");
    }
    
    let res ;
    try {
       res = await axios.get(`http://localhost:8800/api/conversation/find/${user._id}/${searchF_array[0]?._id}`);
    } catch (error) {
      console.log(error);
    }
    console.log(res.data);
    // 627bdd00b16670fe239c5e71
    const convObj = {
      "senderId":user._id,
      "recieverId":searchF_array[0]._id
    }
    if(res.data===null){
      //adds a new conversation
      const current_chat = await axios.post('http://localhost:8800/api/conversation',convObj);
      setCurrentChat(current_chat.data);
    }
    setCurrentChat(res.data);
  }  

  return (
    <>
      <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <form onSubmit={searchFriends}>
                <input type="text" placeholder='Search for friends' className="chatMenuInput" ref={searchFriend}  />
                <input type="submit" value="Lets Chat"/>
            </form>
            { 
              conversations.map((c)=>{
                return (
              <div key={c._id} onClick={()=>setCurrentChat(c)}>
                <Conversation  conversation={c} currentUser={user} />
              </div>
                );
            })
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? <>
            <div className="chatBoxTop">
              {messages.map((m,key)=>{
                 return( 
                  <div ref={scrollRef} key={key}>
                     <Message  message={m} own={m.sender===user._id} user={user} recieverId={currentChat.members.filter((f)=>f!==user._id)}  />
                 </div>
                 );
              })}
            </div>
            <div className="chatBoxBottom">
              <textarea  className="chatMessageInput"onChange={e=>setNewMessage(e.target.value)} value={newMessage} ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div>
            </> 
            :
            <span className="noConversationText">Open a conversation to start a chat </span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUser} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}
