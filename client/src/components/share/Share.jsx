import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import React, { useContext, useRef,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {Link} from 'react-router-dom'
import './share.css'
import axios from 'axios'

export const Share = () => {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user} = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
        userId : user._id,
        desc: desc.current.value
    };
    if(file){
        const data = new FormData();
        const fileName = Date.now()+file.name;
        data.append('path',"public/images/post");
        data.append('name',fileName);
        data.append('file',file);
        newPost.img=`/post/${fileName}`;
        try {
            await axios.post('http://localhost:8800/api/upload',data); //saving images in folder(server)
        } catch (error) {
            console.log(error);
        }
    }
    try {
        await axios.post('http://localhost:8800/api/post',newPost); //creating a new post
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <Link to={`/${user.username}`}>
                    <img src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'/person/noAvatar.png'} alt="" className="shareProfileImg" />
                </Link>
                <input className="shareInput" placeholder={`what's in your mind ${user.username} ?`} ref={desc} />
            </div>
            <hr className='shareHr' />
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className='shareCancelImg' onClick={()=>setFile(null)} />
                </div>
            )}

            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon' />
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id='file' accept='.png,.jpeg,.jpg'  onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon' />
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon' />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type='submit'>share</button>
            </form>
        </div>
    </div>
  )
}
