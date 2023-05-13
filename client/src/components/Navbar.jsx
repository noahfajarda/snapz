import React, { useContext } from "react";
// Link == WILL PREVENT PAGE FROM REFRESHING!!
import { Link } from "react-router-dom";
// import capitalize first letter function
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { UserContext } from "../App";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);

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
              return renderPage(idx, page);
            } else if (bool === undefined) {
              return renderPage(idx, page);
            }
            return <div key={idx}></div>;
          })}
        </ul>
      </div>
    </nav>
  );
}

// render accesible nav element
function renderPage(idx, page) {
  return (
    <li key={idx}>
      <Link to={`/${page.page}`} className="text-black">
        {capitalizeFirstLetter(page.page)}
      </Link>
    </li>
  );
}
