import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";

// import materialize to handle error
import M from "materialize-css";
import { attemptSignup } from "../utils/APICalls/LoginSignupAPICalls";
const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;

export default function Signup() {
  const navigate = useNavigate();
  // useReducer to manage form state
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      name: "",
      image: "",
      profilePicURL: "",
      email: "",
      password: "",
    }
  );

  useEffect(() => {
    if (state.profilePicURL) attemptSignup(state, navigate);
  }, [state.profilePicURL]);

  const postProfilePic = async (pic) => {
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
      return assetData.url;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validPicTypes = ["image/png", "image/jpeg", "image/jpg"];

    // check email is right type
    if (!validateEmail(state.email)) return;

    // check if profile pic is valid pic
    if (state.image) {
      if (!validPicTypes.includes(state.image.type)) {
        M.toast({
          html: "Invalid File Type!",
          classes: "#c62828 red darken-3",
        });
        return;
      }

      // post profile pic & add URL to state
      const profilePicURL = await postProfilePic(state.image);
      dispatch({ profilePicURL });
    } else {
      // function to attempt signup
      attemptSignup(state, navigate);
    }
  };

  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo sign-up">Instagram</h2>
        <form onSubmit={handleSignup}>
          {/* put state variables in inputs */}
          <input
            type="text"
            placeholder="name"
            value={state.name}
            onChange={(e) => dispatch({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            value={state.email}
            onChange={(e) => dispatch({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={state.password}
            onChange={(e) => dispatch({ password: e.target.value })}
          />
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span>Upload Profile Picture</span>
              {/* UPLOAD IMAGE WITH 'CLOUDINARY' (refer to readme) */}
              <input
                type="file"
                onChange={(e) => dispatch({ image: e.target.files[0] })}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light #448aff blue darken-1"
            type="submit"
            name="action"
          >
            Sign Up
          </button>
        </form>
        <h5>
          Already have an account? Click <Link to="/login">here</Link>!
        </h5>
      </div>
    </div>
  );
}
