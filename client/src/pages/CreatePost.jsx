import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { postDetails, createPost } from "../utils/uploadImage";

// WAY TO INPUT FILES
function FileInput({ dispatch }) {
  return (
    <div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
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
      image: "",
      imageUrl: "",
    }
  );

  // post with data will be created ONLY WHEN imageUrl is set
  useEffect(() => {
    if (!state.imageUrl) return;

    createPost(state, navigate);
  }, [state.imageUrl, navigate, state]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      // post image to cloudinary DB
      const imageUrl = await postDetails(state.image);

      // set image url to form state variable & activate useEffect
      dispatch({ imageUrl });
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
          <FileInput dispatch={dispatch} />
          <button
            type="submit"
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            Submit Post
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
