import React from "react";

// WAY TO INPUT FILES
function FileInput() {
  return (
    <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
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
      <div className="card input-filed">
        CreatePost
        <input type="text" placeholder="title" />
        <input type="text" placeholder="body" />
        {/* FILE INPUT */}
        <FileInput />
      </div>
    </React.Fragment>
  );
}
