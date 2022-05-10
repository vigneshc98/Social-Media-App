import React,{useEffect, useState} from 'react';
import { Feed } from '../../components/feed/Feed'
import { Rightbar } from '../../components/righbar/Rightbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Topbar } from '../../components/topbar/Topbar'
import './profile.css';
import axios from 'axios';
import { useParams } from 'react-router';

export const Profile = ({noUser}) => {  //{noUser} from Topbar.jsx

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({noUser});

  const username = useParams().username;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/user?username=${username}`);
        setUser(res.data);
      } catch (error) {
        setUser("No_user");
      }
      // console.log(res.data);
    }
    fetchPosts();
  }, [username]);

  return (
    <>
    {user==='No_user' ? 
      <>
        <Topbar/>
        <div className="profile"> 
          <Sidebar/>
          <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img src={user.coverPicture ? PUBLIC_FOLDER+user.coverPicture : PUBLIC_FOLDER+'/person/noCover.png'} alt="" className="profileCoverImg" /> 
                  <img src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png'} alt="" className="profileUserImg" /> 
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">User Not Found</h4>
                </div>
              </div>
          </div>
        </div>
      </>
    : 
      <>
        <Topbar/>
        <div className="profile"> 
          <Sidebar/>
          <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img src={user.coverPicture ? PUBLIC_FOLDER+user.coverPicture : PUBLIC_FOLDER+'/person/noCover.png'} alt="" className="profileCoverImg" /> 
                  <img src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png'} alt="" className="profileUserImg" /> 
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
              </div>
          </div>
        </div>
        </>
        }
    </>
  )
}
