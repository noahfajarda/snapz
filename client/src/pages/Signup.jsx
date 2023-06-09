import React, { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";

// import materialize to handle error
import M from "materialize-css";
import {
  attemptSignup,
  postProfilePic,
} from "../utils/APICalls/LoginSignupAPICalls";

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
    // once profile pic is set, try to sign up
    if (state.profilePicURL) attemptSignup(state, navigate);
  }, [state.profilePicURL]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const validPicTypes = ["image/png", "image/jpeg", "image/jpg"];

    // check email is right type
    if (!validateEmail(state.email)) return;

    // if there's no image, attempt to signup with function
    if (!state.image) {
      attemptSignup(state, navigate);
      return;
    }

    // check if profile pic is valid pic
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
  };

  return (
    <div className="mt-8">
      <div className="card auth-card input-field">
        <h2 className="brand-logo sign-up">Snapz</h2>
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
        <div className="p-5">
          <h5>
            Already have an account? Click{" "}
            <Link to="/login" className="text-blue-500 visited:text-purple-600">
              here
            </Link>
            !
          </h5>
        </div>
      </div>
    </div>
  );
}
