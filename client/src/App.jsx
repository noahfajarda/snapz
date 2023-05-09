import React from "react";
// routing == react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
