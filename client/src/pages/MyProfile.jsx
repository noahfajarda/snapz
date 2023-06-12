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
    "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=";

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
                className="w-40 h-40 rounded-full outline outline-offset-2 outline-slate-500"
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

              <div
                className="flex justify-between py-4"
                style={{
                  width: "108%",
                }}
              >
                {myPosts.length === 1 ? (
                  <div className="flex flex-col items-center">
                    <h6>{myPosts.length}</h6>
                    <h6>post</h6>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h6>{myPosts.length}</h6>
                    <h6>posts</h6>
                  </div>
                )}
                {state && state.followers.length === 1 ? (
                  <div className="flex flex-col items-center">
                    <h6>{state.followers.length}</h6>
                    <h6>follower</h6>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h6>{state.followers.length}</h6>
                    <h6>followers</h6>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <h6>{state && state.followers.length}</h6>
                  <h6>following</h6>
                </div>
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
