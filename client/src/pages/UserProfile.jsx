import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { retrieveProfilePosts } from "../utils/APICalls/ProfileAPICalls";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  // retrieve user data from context
  const { state, dispatch } = useContext(UserContext);
  // retrieve userId from URL param
  const { userId } = useParams();

  useEffect(() => {
    // retrieve user data & their posts
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserProfile(data);
      });
  }, []);

  return (
    <>
      {userProfile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"
                alt=""
              />
            </div>
            <div>
              <h4>{userProfile && userProfile.oneUser.name}</h4>
              <h4>{userProfile && userProfile.oneUser.email}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile && userProfile.userPosts.length} posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </div>
            </div>
          </div>

          <div className="gallery">
            {/* iterate through posts data */}
            {userProfile.userPosts.map((item, idx) => (
              <img
                key={idx}
                className="photo-item"
                alt="might be a video"
                src={item.asset}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2>Loading... </h2>
      )}
    </>
  );
}
