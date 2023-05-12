import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import postDetails from "../utils/uploadImage";

// inform user post has been created
import M from "materialize-css";

// WAY TO INPUT FILES
function FileInput({ image, dispatch }) {
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

  const handlePostSubmit = async (e) => {
    try {
      e.preventDefault();
      // post image to cloudinary DB
      const imageUrl = await postDetails(state.image);

      // set image url to form state variable
      dispatch({ imageUrl });

      // post data to server
      fetch("/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // attatch title, body, & imageUul
          title: state.title,
          body: state.body,
          imageUrl: state.imageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // handle error
          if (data.error) {
            // show pop-up
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          } else {
            // show pop-up
            M.toast({
              html: "Created Post Successfully",
              classes: "#43a047 green darken-1",
            });
            // navigate to home screen
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.error(e);
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
          {/* FILE INPUT */}
          <FileInput image={state.image} dispatch={dispatch} />
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
