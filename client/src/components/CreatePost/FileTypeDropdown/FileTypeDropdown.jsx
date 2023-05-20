import React, { useState } from "react";
import "./FileTypeDropdown.css";

export default function FileTypeDropdown({ state, dispatch }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      <button
        type="button"
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {state.type}
      </button>
      <ul className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <li
          className="dropdown-item"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "Image" });
            setOpen(false);
          }}
        >
          Image
        </li>
        <li
          className="dropdown-item"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "Video" });
            setOpen(false);
          }}
        >
          Video
        </li>
      </ul>
    </div>
  );
}
