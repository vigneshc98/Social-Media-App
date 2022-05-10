import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import React, { useContext, useRef,useState } from 'react';
import './topbar.css';
import { Link,useNavigate, Navigate  } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Profile } from '../../pages/profile/Profile';

export const Topbar = () => {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    const search = useRef();

    const handleSearchClick = async () => {
        
        if(search.current.value !==''){
            console.log('inside search:',search.current.value);
            try {
                 const user = await axios.get(`http://localhost:8800/api/user?username=${search.current.value}`);
                 console.log(user);
                 navigate(`/${search.current.value}`);
            } catch (error) {
                 navigate(`/${search.current.value}`);
            }
        }
    }

  return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Social-App</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input className="searchInput" placeholder='search for friend, post or video' ref={search}/>
                </div>
                <input type="submit" value="search" className='searchButton' onClick={handleSearchClick} />
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink"></div>
                    <div className="topbarLink"></div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                </div>
                <Link to={`/${user.username}`}>
                    <img src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png' } alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
  )
}
