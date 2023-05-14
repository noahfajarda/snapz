import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDetails, createPost } from "../utils/uploadImage";
import FileTypeDropdown from "../components/FileTypeDropdown/FileTypeDropdown";

// WAY TO INPUT FILES
function FileInput({ state, dispatch }) {
  return (
    <div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload {state.type}</span>
        {/* UPLOAD IMAGE WITH 'CLOUDINARY' (refer to readme) */}
        <input
          type="file"
          onChange={(e) => dispatch({ asset: e.target.files[0] })}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
}

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
    if (!state.assetUrl) return;

    createPost(state, navigate);
    setLoadingText("Post Created!");
  }, [state.assetUrl, navigate, state]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingText("Loading...");
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
      <div
        className="card input-filed"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
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
          <div>{loadingText}</div>
        </form>
      </div>
    </React.Fragment>
  );
}
