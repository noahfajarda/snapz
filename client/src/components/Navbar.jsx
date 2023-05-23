import React, { useState, useContext, useRef, useEffect } from "react";
// Link == WILL PREVENT PAGE FROM REFRESHING!!
import { Link, useNavigate } from "react-router-dom";
// import capitalize first letter function
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { UserContext } from "../App";
import M from "materialize-css";

export default function Navbar() {
  const navigate = useNavigate();
  // retrieve user context data
  const { state, dispatch } = useContext(UserContext);
  // search modal
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results);
      });
  };

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
      page: "followerfeed",
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
        <div>
          {/* Link == WON'T REFRESH PAGE */}
          <Link
            // conditional for logo
            to={state ? "/" : "/login"}
            className="brand-logo left text-black"
          >
            Instagram
          </Link>
          {/* unique for search */}
          {loggedIn && (
            <li key={6}>
              <i
                data-target="modal1"
                className="large material-icons modal-trigger search-users"
                style={{ color: "black" }}
              >
                search
              </i>
            </li>
          )}
        </div>
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

      {/* search modal */}
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">
              Close
            </button>
          </div>
          <input
            type="text"
            placeholder="search users"
            value={search}
            className="text-black"
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection flex flex-col">
            {userDetails?.user &&
              userDetails?.user.map((item) => (
                <Link
                  key={item._id}
                  to={
                    item._id !== state._id ? `/profile/${item._id}` : "/profile"
                  }
                  onClick={async () => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");

                    // check for pathname
                    window.location.pathname.startsWith("/profile/") &&
                      navigate(`/profile/${item._id}`);
                    window.location.reload();
                  }}
                >
                  <li className="collection-item text-black">{item.email}</li>
                </Link>
              ))}
          </ul>
        </div>
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
