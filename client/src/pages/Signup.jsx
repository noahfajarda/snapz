import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo sign-up">Instagram</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />

        <button
          className="btn waves-effect waves-light #448aff blue accent-2"
          type="submit"
          name="action"
        >
          <i className="material-icons">Login</i>
        </button>
        <h5>
          Already have an account? Click <Link to="/login">here</Link>!
        </h5>
      </div>
    </div>
  );
}
