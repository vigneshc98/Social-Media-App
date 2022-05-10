import React,{useState, useEffect, useContext} from 'react';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import './feed.css';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
// import {Posts} from '../../dummyData'

export const Feed = ({username}) => {     //{username} from Profile.jsx
  const [posts, setPosts] = useState([]);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username? await axios.get(`http://localhost:8800/api/post/profile/${username}`) : await axios.get(`http://localhost:8800/api/post/timeline/${user._id}`);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  }, [username, user._id]);
  
  return (
    <div className='feed'>
      <div className="feedWrapper">
       {(!username || username===user.username) && <Share />}
        {posts.map((p)=>  <Post key={p._id} post={p} /> )}
      </div>
    </div>
  )
}
