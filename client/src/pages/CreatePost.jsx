import React from "react";

// WAY TO INPUT FILES
function FileInput() {
  return (
    <div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input type="file" />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
}

export default function CreatePost() {
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
        <input type="text" placeholder="title" />
        <input type="text" placeholder="body" />
        {/* FILE INPUT */}
        <FileInput />
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
          Submit Post
        </button>
      </div>
    </React.Fragment>
  );
}
