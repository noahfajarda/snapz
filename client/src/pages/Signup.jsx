import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";

// import materialize to handle error
import M from "materialize-css";

export default function Signup() {
  const navigate = useNavigate();
  // useReducer to manage form state
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const handleSignup = (e) => {
    e.preventDefault();

    // check if email is valid in format
    if (!validateEmail(state.email)) {
      M.toast({
        html: "Invalid Email!",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    // submit signup data to DB
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        password: state.password,
        email: state.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
            html: data.message,
            classes: "#43a047 green darken-1",
          });
          // navigate back to login
          navigate("/login");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo sign-up">Instagram</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="name"
            value={state.name}
            onChange={(e) => dispatch({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            value={state.email}
            onChange={(e) => dispatch({ email: e.target.value })}
          />
          <input
            type="text"
            placeholder="password"
            value={state.password}
            onChange={(e) => dispatch({ password: e.target.value })}
          />

          <button
            className="btn waves-effect waves-light #448aff blue darken-1"
            type="submit"
            name="action"
          >
            Sign Up
          </button>
        </form>
        <h5>
          Already have an account? Click <Link to="/login">here</Link>!
        </h5>
      </div>
    </div>
  );
}
