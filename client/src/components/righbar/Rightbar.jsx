import React,{useState, useEffect, useContext} from 'react';
import './rightbar.css';
import {Users} from '../../dummyData'
import { Online } from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

export const Rightbar = ({user}) => {   //{user} from Profile.jsx, here user if searched user ie., profile/:user

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user:currentUser, dispatch} = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  // console.log(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser,user]);


  useEffect(() => {
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

  const handleFollowClick = async () => {
    // console.log(friends);
    try {
      if(followed){
        await axios.put(`http://localhost:8800/api/user/${user._id}/unfollow`,{userId:currentUser._id});
        await axios.delete(`http://localhost:8800/api/conversation/delete/${user._id}/${currentUser._id}`);
        dispatch({type:"UNFOLLOW", payload:user._id})
      }else{
        await axios.put(`http://localhost:8800/api/user/${user._id}/follow`,{userId:currentUser._id});
        dispatch({type:"FOLLOW", payload:user._id})
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleFollowClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===1 ? "Single" : user.relationship===2 ? "Married" : "-"}</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          
            {friends.length>0 && friends.map((f,key)=> {
              return (
                <Link to={`/${f.username}`} style={{textDecoration:"none"}} key={f._id} >
                  <div >
                  <div className="rightbarFollowing">
                    <img
                      src={f.profilePicture ? PUBLIC_FOLDER+f.profilePicture : PUBLIC_FOLDER+"/person/noAvatar.png"}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{f.username}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </>
    );
  }; 

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
