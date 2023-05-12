import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";

// import materialize to handle error
import M from "materialize-css";

export default function Login() {
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

    // submit signup data to DB
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: state.password,
        email: state.email,
      }),
    })
      .then((res) => res.json())
      // contains 'user info' & 'token'
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
          // set local storage items for 'jwt' & user data
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // show pop-up
          M.toast({
            html: "Successfully Signed in",
            classes: "#43a047 green darken-1",
          });
          // navigate to home screen
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-card">
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
