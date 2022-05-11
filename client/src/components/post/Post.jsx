import { MoreVert } from '@mui/icons-material';
import React,{useState,useEffect, useContext} from 'react';
import './post.css';
// import {Users} from '../../dummyData';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Post = ({post}) => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user:currentUser} = useContext(AuthContext);

  const {userId, desc, img, likes,createdAt } = post;

  // const currentUser = Users.filter((u)=> u.id===userId);
  // const {profilePicture, username} = currentUser[0];

  const [ulike, setUlike] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:8800/api/user?userId=${userId}`);
      setUser(res.data);
      // console.log(res.data);
    }
    fetchPosts();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id,post.likes]);
  

  const likeHandler = async () => {
    setUlike(isLiked ? ulike-1 : ulike+1);
    setIsLiked(!isLiked);
    try {
      await axios.put(`http://localhost:8800/api/post/${post._id}/like`,{userId:currentUser._id});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/${user.username}`}>
                  <img src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="postProfileImg" />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert/>
              </div>
            </div>

            <div className="postCenter">
              <span className="postText">{desc}</span>
              <img src={PUBLIC_FOLDER+img} alt="" className="postImg" />
            </div>

            <div className="postBottom">
              <div className="postBottomLeft">
                <img src={`${PUBLIC_FOLDER}/like.png`} alt="" className="likeIcon" onClick={likeHandler} />
                <img src={`${PUBLIC_FOLDER}/heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
                <span className="postLikeCounter">{ulike} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">comments</span>
              </div>
            </div>
        </div>
    </div>
  )
}
