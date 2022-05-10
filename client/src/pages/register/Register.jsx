import "./register.css";
import {useRef} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  // const {user,isFetching,error, dispatch} = useContext(AuthContext);

  const handleClick = async (e) =>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Password don't match")
    }else{
      const user = {
        username: username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try {
        await axios.post('http://localhost:8800/api/auth/register',user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }

    // loginCall({email:email.current.value, password:password.current.value},dispatch);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Damasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" ref={username} required/>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required />
            <input placeholder="Password" className="loginInput" type="password" ref={password} required minLength="6" />
            <input placeholder="Password Again" className="loginInput" type="password" ref={passwordAgain} required/>
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
