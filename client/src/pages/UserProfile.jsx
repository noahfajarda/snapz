import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import {
  retrieveUserProfilePosts,
  followUser,
  unfollowUser,
} from "../utils/APICalls/UserProfileAPICalls";

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

  // see if user is already following
  useEffect(() => {
    if (userProfile && userProfile.oneUser.followers.includes(state._id)) {
      setShowFollow(true);
    }
  }, [userProfile]);

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
                <h6>{userProfile.oneUser.following.length} following</h6>
                {showFollow ? (
                  <button
                    className="btn waves-effect waves-light #448aff blue darken-1"
                    type="submit"
                    name="action"
                    onClick={() =>
                      unfollowUser(
                        userId,
                        dispatch,
                        setUserProfile,
                        setShowFollow
                      )
                    }
                  >
                    {/* unfollow button */}
                    Unfollow User
                  </button>
                ) : (
                  <button
                    className="btn waves-effect waves-light #448aff blue darken-1"
                    type="submit"
                    name="action"
                    onClick={() =>
                      followUser(
                        userId,
                        dispatch,
                        setUserProfile,
                        setShowFollow
                      )
                    }
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
