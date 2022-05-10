import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Messenger } from "./pages/messenger/Messenger";

function App() {

   const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ?<Home/>: <Register/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/messenger" element={!user ? <Navigate to="/register" /> : <Messenger/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/:username" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;