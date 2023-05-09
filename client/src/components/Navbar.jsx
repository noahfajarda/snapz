import React from "react";
// Link == WILL PREVENT PAGE FROM REFRESHING!!
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper ">
        {/* Link == WON'T REFRESH PAGE */}
        <Link to="/home" className="brand-logo left text-black">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/login" className="text-black">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-black">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-black">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
