import React from "react";

// WAY TO INPUT FILES
export default function FileInput({ state, dispatch }) {
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
