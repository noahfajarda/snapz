import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import validate email util
import validateEmail from "../utils/validateEmail";
// reset password API call
import { sendResetEmail } from "../utils/APICalls/ResetPasswordAPICalls";
// import materialize to handle error
import M from "materialize-css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetPasswordForm = (e) => {
    e.preventDefault();

    // check if email is valid in format
    if (!validateEmail(email)) {
      M.toast({
        html: "Invalid Email!",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    // try to reset password
    sendResetEmail(email, navigate);
  };

  return (
    <div className="mt-8">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <form onSubmit={resetPasswordForm}>
          {/* put state variables in inputs */}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn waves-effect waves-light #448aff blue darken-1"
            type="submit"
            name="action"
          >
            Send Email To Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
