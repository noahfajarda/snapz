import React, { useContext } from "react";
// Link == WILL PREVENT PAGE FROM REFRESHING!!
import { Link, useNavigate } from "react-router-dom";
// import capitalize first letter function
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { UserContext } from "../App";

export default function Navbar() {
  const navigate = useNavigate();
  // retrieve user context data
  const { state, dispatch } = useContext(UserContext);

  // if user context data object exists, user is logged in
  let loggedIn = state?._id ? true : undefined;

  // pages and bool if shown if logged in
  const pages = [
    {
      loggedIn: undefined,
      page: "login",
    },
    {
      loggedIn: undefined,
      page: "signup",
    },
    {
      loggedIn: true,
      page: "profile",
    },
    {
      loggedIn: true,
      page: "create",
    },
    {
      loggedIn: true,
      page: "logout",
    },
  ];

  return (
    <nav>
      <div className="nav-wrapper">
        {/* Link == WON'T REFRESH PAGE */}
        <Link
          // conditional for logo
          to={state ? "/" : "/login"}
          className="brand-logo left text-black"
        >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {/*  iterate through pages array to add to navbar  */}
          {pages.map((page, idx) => {
            // display based on if user is logged in or not
            const bool = loggedIn === page.loggedIn;
            if (bool) {
              return RenderPage(idx, page, navigate, dispatch);
            } else if (bool === undefined) {
              return RenderPage(idx, page, navigate, dispatch);
            }
            return <div key={idx}></div>;
          })}
        </ul>
      </div>
    </nav>
  );
}

// render accesible nav element
function RenderPage(idx, page, navigate, dispatch) {
  // log out functionality
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  if (page.page === "logout") {
    return (
      <li key={idx}>
        <button className="btn #c62828 red darken-3" onClick={handleLogout}>
          {capitalizeFirstLetter(page.page)}
        </button>
      </li>
    );
  }

  return (
    <li key={idx}>
      <Link to={`/${page.page}`} className="text-black">
        {capitalizeFirstLetter(page.page)}
      </Link>
    </li>
  );
}
