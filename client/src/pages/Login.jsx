import React, { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";
// retrieve user data from user context wrapper
import { UserContext } from "../App";
// API call to attempt login
import { attemptLogin } from "../utils/APICalls/LoginSignupAPICalls";
// import materialize to handle error
import M from "materialize-css";

export default function Login() {
  // retrieve  'state' & 'dispatch' for user context
  const User = useContext(UserContext);

  const navigate = useNavigate();
  // useReducer to manage form state
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      email: "",
      password: "",
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();

    // check if email is valid in format
    if (!validateEmail(state.email)) {
      M.toast({
        html: "Invalid Email!",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    // function to attempt login
    attemptLogin(state, User, navigate);
  };

  return (
    <div className="mt-8">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <form onSubmit={handleLogin}>
          {/* put state variables in inputs */}
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

          <button
            className="btn waves-effect waves-light #448aff blue darken-1"
            type="submit"
            name="action"
          >
            Log In
          </button>
        </form>
        <h5>
          Don't have an account? Click <Link to="/signup">here</Link>!
        </h5>
      </div>
    </div>
  );
}
