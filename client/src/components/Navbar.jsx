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
    fetchUsers("");
  }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query.toLowerCase() }),
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

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="flex justify-between items-center h-20 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 sticky top-0 z-50">
      {/* logo & search */}
      <section className="flex">
        {/* Link == WON'T REFRESH PAGE */}
        <Link
          // conditional for logo
          to={state ? "/" : "/login"}
          className="brand-logo px-3"
        >
          Snapz
        </Link>
        {/* unique for search */}
        {loggedIn && (
          <div className="px-3">
            <i
              data-target="modal1"
              className="large material-icons modal-trigger text-black cursor-pointer"
            >
              search
            </i>
          </div>
        )}
      </section>
      {/* right nav elements */}
      <section className="flex">
        <ul id="nav-mobile" className="right">
          {/*  iterate through pages array to add to navbar  */}
          {pages.map((page, idx) => {
            // display based on if user is logged in or not
            const bool = loggedIn === page.loggedIn;
            if (bool) {
              return RenderPage(
                idx,
                page,
                navigate,
                dispatch,
                setIsNavExpanded
              );
            } else if (bool === undefined) {
              return RenderPage(
                idx,
                page,
                navigate,
                dispatch,
                setIsNavExpanded
              );
            }
            return <div key={idx}></div>;
          })}
        </ul>
      </section>
      <section className="flex mobile-section">
        {/* mobile nav */}
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            {pages.map((page, idx) => {
              const bool = loggedIn === page.loggedIn;
              if (bool) {
                return RenderPage(
                  idx,
                  page,
                  navigate,
                  dispatch,
                  setIsNavExpanded
                );
              } else if (bool === undefined) {
                return RenderPage(
                  idx,
                  page,
                  navigate,
                  dispatch,
                  setIsNavExpanded
                );
              }
              return <div key={idx}></div>;
            })}
          </ul>
        </div>
        {/* mobile nav button */}
        <div className="flex mobile-nav-container">
          <div className="hamburger">Menu</div>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <svg
              height="32px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </button>
        </div>
      </section>
      {/* modal */}
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
          <ul className="flex flex-col">
            {loggedIn &&
              userDetails?.user &&
              userDetails?.user.map((item) => (
                <Link
                  className="flex pt-4 pb-4"
                  key={item._id}
                  to={
                    item._id !== state._id ? `/profile/${item._id}` : "/profile"
                  }
                  onClick={async () => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                    // don't refresh page if it's the current user
                    if (item._id === state._id) return;
                    // check for pathname
                    if (window.location.pathname.startsWith("/profile/")) {
                      navigate(`/profile/${item._id}`);
                      window.location.reload();
                    }
                  }}
                >
                  {/* <li className="collection-item text-black">{item.email}</li> */}
                  <img
                    className="w-14 h-14 rounded-full mr-6 outline outline-offset-2 outline-slate-500"
                    src={
                      item.profilePicURL
                        ? item.profilePicURL
                        : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
                    }
                    alt=""
                  />
                  <div className="flex flex-col ml-6">
                    <h1 className="text-black">{item.name}</h1>
                    <h3 className="text-slate-500">{item.email}</h3>
                  </div>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// render accesible nav element
function RenderPage(idx, page, navigate, dispatch, setIsNavExpanded) {
  // log out functionality
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  if (page.page === "logout") {
    return (
      <li key={idx}>
        <button
          className="btn #c62828 red darken-3"
          onClick={() => {
            setIsNavExpanded(false);
            handleLogout();
          }}
        >
          {capitalizeFirstLetter(page.page)}
        </button>
      </li>
    );
  }

  return (
    <li key={idx}>
      <Link
        to={`/${page.page}`}
        className="text-black"
        onClick={() => setIsNavExpanded(false)}
      >
        {capitalizeFirstLetter(page.page)}
      </Link>
    </li>
  );
}
