import React, { useEffect, useReducer, createContext, useContext } from "react";
// routing == react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/MyProfile";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";

// custom reducer hook
import { initialState, reducer } from "./utils/reducerCustomHook/userReducer";

// create/export context
export const UserContext = createContext();

// separate component to access 'useNavigate'
const Routing = () => {
  const navigate = useNavigate();
  const User = useContext(UserContext);

  // on initial mount, check for existing user data from potential log in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // reroute to login if user data isn't present
    if (user) {
      // set user data as payload for user context
      User.dispatch({ type: "USER", payload: user });
      return;
    }
    navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* match the EXACT path */}
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

function App() {
  // userReducer custom hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // wrap in context provider to allow components to have access to variables
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
