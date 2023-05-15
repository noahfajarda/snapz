import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  // retrieve user data from context
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch(`myposts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // check if user data is valid
        if (!("error" in result) && result.length !== 0) {
          // latest go on top
          result.myposts.reverse();
        }

        setMyPosts(result.myposts);
      });
  }, []);

  return (
    <div style={{ maxWidth: "1080px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid gray",
          padding: "20px",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"
            alt=""
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{myPosts.length} posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {myPosts.map((item, idx) => (
          <img
            key={idx}
            className="photo-item"
            alt="might be a video"
            src={item.asset}
          />
        ))}
      </div>
    </div>
  );
}
