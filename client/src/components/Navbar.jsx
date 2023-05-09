import React from "react";
// Link == WILL PREVENT PAGE FROM REFRESHING!!
import { Link } from "react-router-dom";
// import capitalize first letter function
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

export default function Navbar() {
  const pages = ["login", "signup", "profile", "create"];

  return (
    <nav>
      <div className="nav-wrapper">
        {/* Link == WON'T REFRESH PAGE */}
        <Link to="/home" className="brand-logo left text-black">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {pages.map((page, idx) => (
            <li key={idx}>
              {/* iterate through pages array to add to navbar */}
              <Link to={`/${page}`} className="text-black">
                {capitalizeFirstLetter(page)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
