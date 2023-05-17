import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import { retrieveUserProfilePosts } from "../utils/APICalls/UserProfileAPICalls";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(false);
  // retrieve user data from context
  const { state, dispatch } = useContext(UserContext);
  // retrieve userId from URL param
  const { userId } = useParams();

  useEffect(() => {
    // retrieve profile post from any user for their user page
    retrieveUserProfilePosts(userId, setUserProfile);
  }, []);

  const followUser = async () => {
    const followResponse = await fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    });

    let followData = await followResponse.json();
    followData = followData.addFollowingToCurrentUser;
    dispatch({
      type: "UPDATE",
      payload: {
        following: followData.following,
        followers: followData.followers,
      },
    });
    localStorage.setItem("user", JSON.stringify(followData));
    setUserProfile((prev) => {
      return {
        ...prev,
        oneUser: {
          ...prev.oneUser,
          followers: [...prev.oneUser.followers, followData._id],
        },
      };
    });
    setShowFollow(true);
  };

  const unfollowUser = async () => {
    const unfollowResponse = await fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    });

    let followData = await unfollowResponse.json();
    followData = followData.removeFollowingFromCurrentUser;
    dispatch({
      type: "UPDATE",
      payload: {
        following: followData.following,
        followers: followData.followers,
      },
    });
    localStorage.setItem("user", JSON.stringify(followData));
    setUserProfile((prev) => {
      const newFollower = prev.oneUser.followers.filter(
        (item) => item !== followData._id
      );
      return {
        ...prev,
        oneUser: {
          ...prev.oneUser,
          followers: newFollower,
        },
      };
    });
    setShowFollow(false);
  };

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
              <h4>{userProfile.oneUser.name}</h4>
              <h4>{userProfile.oneUser.email}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                {userProfile.userPosts.length === 1 ? (
                  <h6>{userProfile.userPosts.length} post</h6>
                ) : (
                  <h6>{userProfile.userPosts.length} posts</h6>
                )}
                {userProfile.oneUser.followers.length === 1 ? (
                  <h6>{userProfile.oneUser.followers.length} follower</h6>
                ) : (
                  <h6>{userProfile.oneUser.followers.length} followers</h6>
                )}
                <h6>40 following</h6>
                {showFollow ? (
                  <button
                    className="btn waves-effect waves-light #448aff blue darken-1"
                    type="submit"
                    name="action"
                    onClick={() => unfollowUser()}
                  >
                    {/* unfollow button */}
                    Unfollow User
                  </button>
                ) : (
                  <button
                    className="btn waves-effect waves-light #448aff blue darken-1"
                    type="submit"
                    name="action"
                    onClick={() => followUser()}
                  >
                    {/* follow button */}
                    Follow User
                  </button>
                )}
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
