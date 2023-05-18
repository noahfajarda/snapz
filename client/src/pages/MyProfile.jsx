import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { retrieveProfilePosts } from "../utils/APICalls/ProfileAPICalls";
import M from "materialize-css";

const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;

export default function MyProfile() {
  const [myPosts, setMyPosts] = useState([]);
  // retrieve user data from context
  const { state, dispatch } = useContext(UserContext);

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    // retrieve posts data
    retrieveProfilePosts(setMyPosts);
    // set profile pic url
    setUrl(
      state && state.profilePicURL
        ? state.profilePicURL
        : "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
    );
  }, [state]);

  useEffect(() => {
    if (image) {
      const changeImage = async (pic) => {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", REACT_APP_UPLOAD_PRESET);
        data.append("cloud_name", REACT_APP_CLOUD_NAME);
        // specify folder
        data.append("folder", "Instagram-Clone/profile-Pics");
        // API ROUTE = https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload
        // .../video/... == mp4 ONLY
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: data,
            }
          );
          // asset POST response data & return the asset URL alone
          const assetData = await response.json();
          // handle error
          if (assetData?.error?.message) {
            // show pop-up
            M.toast({
              html: assetData.error.message,
              classes: "#c62828 red darken-3",
            });
          }
          // set url & update local storage with url
          setUrl(assetData.url);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, profilePicURL: assetData.url })
          );

          // also update context state variable
          dispatch({ type: "UPDATEPROFILEPIC", payload: assetData.url });
        } catch (err) {
          console.error(err);
        }
      };
      changeImage(image);
    }
  }, [image]);

  const changeProfilePic = async (pic) => {
    setImage(pic);
  };

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
            src={url}
            alt=""
          />
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span>Upload profile pic</span>
              <input
                type="file"
                onChange={(e) => changeProfilePic(e.target.files[0])}
              />
            </div>
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <div>
          <h4>{state && state.name}</h4>
          <h4>{state && state.email}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{myPosts.length} posts</h6>
            <h6>{state && state.followers.length} followers</h6>
            <h6>{state && state.following.length} following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {/* iterate through posts data */}
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
