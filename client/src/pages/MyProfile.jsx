import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import {
  retrieveProfilePosts,
  uploadNewProfilePic,
} from "../utils/APICalls/ProfileAPICalls";
import UserPosts from "../components/ProfilePages/UserPosts";

export default function MyProfile() {
  // retrieve user data from context
  const { state, dispatch } = useContext(UserContext);

  const [myPosts, setMyPosts] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const defaultProfilePic =
    "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg";

  useEffect(() => {
    // retrieve posts data & set profile pic url
    retrieveProfilePosts(setMyPosts);
    setUrl(
      state && state.profilePicURL ? state.profilePicURL : defaultProfilePic
    );
  }, [state]);

  useEffect(() => {
    // change profile pic
    if (image) uploadNewProfilePic(image, setUrl, state, dispatch);
  }, [image]);

  return (
    <>
      {state ? (
        <div className="max-w-5xl mx-auto my-0">
          <div className="flex justify-around mx-0 my-5 border-b-2 border-b-gray-300 p-5">
            <div>
              <img
                className="w-40 h-40 rounded-full"
                src={url}
                alt="profile-pic"
              />
              <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                  <span>Change profile pic</span>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <input className="file-path validate" type="text" />
              </div>
            </div>

            <div>
              <h4>{state && state.name}</h4>
              <h4>{state && state.email}</h4>

              <div className="flex justify-between w-full">
                <h6>{myPosts.length} posts</h6>
                <h6>{state && state.followers.length} followers</h6>
                <h6>{state && state.following.length} following</h6>
              </div>
            </div>
          </div>

          <UserPosts posts={myPosts} />
        </div>
      ) : (
        <h2>Loading... </h2>
      )}
    </>
  );
}
