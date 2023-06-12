import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
// API calls
import {
  postDetails,
  createPost,
} from "../utils/APICalls/CreatePostAPICalls/uploadImage";
// components
import FileTypeDropdown from "../components/CreatePost/FileTypeDropdown/FileTypeDropdown";
import FileInput from "../components/CreatePost/FileInput";
// loading svg
import loadingGIF from "../spinner.svg";

export default function CreatePost() {
  const navigate = useNavigate();

  // set form state variables with 'useReducer'
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      title: "",
      body: "",
      asset: "",
      type: "Image",
      assetUrl: "",
    }
  );
  const [loadingText, setLoadingText] = useState("");

  // post with data will be created ONLY WHEN assetUrl is set
  useEffect(() => {
    if (!state.assetUrl) {
      setLoadingText("");
      document.getElementById("create-loading").style.display = "none";
      return;
    }

    // create the new post
    createPost(state, navigate);
    setLoadingText("Post Created!");
    document.getElementById("create-loading").style.display = "none";
  }, [state.assetUrl, navigate, state]);

  // function for form submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoadingText("Creating Post...");
    document.getElementById("create-loading").style.display = "block";

    try {
      // post asset to cloudinary DB
      const assetUrl = await postDetails(state.asset, state.type, navigate);

      // set asset url to form state variable & activate useEffect
      dispatch({ assetUrl });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <div className="card input-filed mx-auto my-8 max-w-xl p-5 text-center">
        Create Post
        <form onSubmit={handlePostSubmit}>
          {/* title & body state variables */}
          <input
            type="text"
            placeholder="title"
            value={state.title}
            onChange={(e) => {
              dispatch({ title: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="body"
            value={state.body}
            onChange={(e) => dispatch({ body: e.target.value })}
          />
          {/* FILE INPUT (just pass in dispatch to change the image) */}
          <FileInput state={state} dispatch={dispatch} />
          {/* dropdown menu for filetype */}
          <FileTypeDropdown state={state} dispatch={dispatch} />
          <button
            type="submit"
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            Submit Post
          </button>
          <div className="flex flex-col pt-6 justify-center items-center">
            <div>{loadingText}</div>
            <img
              src={loadingGIF}
              id="create-loading"
              height="60px"
              width="60px"
              alt="React Logo"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
